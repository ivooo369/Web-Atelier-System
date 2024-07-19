import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM messages");
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Възникна вътрешна грешка в сървъра!" });
  }
});

router.delete("/:messageId", async (req, res) => {
  const { messageId } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM messages WHERE message_id = ?", [
      messageId,
    ]);
    connection.release();
    res.status(200).json({ message: "Съобщението е изтрито успешно!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при изтриване на съобщението!" });
  }
});

export default router;
