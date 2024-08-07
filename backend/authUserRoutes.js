import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const pool = mysql.createPool(config);
const authUserRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use(authUserRouter);

const generateCustomerToken = (customerEmail) => {
  const token = jwt.sign({ email: customerEmail }, "customerAuthKey", {
    expiresIn: "1h",
  });
  return token;
};

authUserRouter.post("/sign-in", async (req, res) => {
  const { customerEmail, customerPassword } = req.body;

  try {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(
      "SELECT * FROM customers WHERE customer_email = ?",
      [customerEmail]
    );
    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: "Потребителят не е намерен!" });
    }

    const hashedPasswordFromDB = rows[0].customer_password;
    const match = await bcrypt.compare(customerPassword, hashedPasswordFromDB);

    if (!match) {
      return res.status(401).json({ message: "Невалидни данни за вход!" });
    }

    const token = generateCustomerToken(customerEmail);
    res.status(200).json({ message: "Влизането е успешно!", token });
  } catch (error) {
    res.status(500).json({ error: "Грешка при влизане!" });
  }
});

authUserRouter.post("/sign-up", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPassword,
      customerCity,
      customerAddress,
      customerPhone,
    } = req.body;

    const hashedPassword = await bcrypt.hash(customerPassword, 10);

    const connection = await pool.getConnection();

    const [existingUser] = await connection.query(
      "SELECT * FROM customers WHERE customer_email = ?",
      [customerEmail]
    );
    if (existingUser.length > 0) {
      connection.release();
      return res
        .status(400)
        .json({ error: "Вече съществува потребител с този имейл адрес!" });
    }

    const [result] = await connection.query(
      "INSERT INTO customers (customer_name, customer_email, customer_password, customer_city, customer_address, customer_phone, customer_sign_up_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        customerName,
        customerEmail,
        hashedPassword,
        customerCity,
        customerAddress,
        customerPhone,
        new Date(),
      ]
    );
    connection.release();

    const token = generateCustomerToken(customerEmail);

    res.status(201).json({
      message: "Клиентът е успешно добавен!",
      customer_id: result.insertId,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Грешка при добавяне на клиент!" });
  }
});

export default authUserRouter;
