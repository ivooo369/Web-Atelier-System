import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.post("/", async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO messages (message_customer_name, message_customer_email, message_title, message_content, message_submission_date) VALUES (?, ?, ?, ?, ?)",
      [name, email, topic, message, new Date()]
    );
    console.log("Добавено съобщение: ", result.insertId);
    connection.release();
    res.status(201).json({ message: "Съобщението беше запазено успешно!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при запазване на съобщението!" });
  }
});

export default router;
