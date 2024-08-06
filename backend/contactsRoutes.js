import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.post("/", async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO messages (message_customer_name, message_customer_email, message_title, message_content, message_submission_date) VALUES (?, ?, ?, ?, ?)",
      [name, email, topic, message, new Date()]
    );
    connection.release();
    res.status(201).json({ message: "Съобщението беше запазено успешно!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при запазване на съобщението!" });
  }
});

router.get("/", async (req, res) => {
  const { email } = req.query;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT customer_name, customer_email FROM customers WHERE customer_email = ?",
      [email]
    );
    connection.release();

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Потребителят не е намерен!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Възникна вътрешна грешка в сървъра!" });
  }
});

export default router;
