import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const pool = mysql.createPool(config);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [productCount] = await connection.query(
      "SELECT COUNT(*) AS productCount FROM products"
    );
    const [orderCount] = await connection.query(
      "SELECT COUNT(*) AS orderCount FROM orders"
    );
    const [messageCount] = await connection.query(
      "SELECT COUNT(*) AS messageCount FROM messages"
    );
    connection.release();

    res.status(200).json({
      productCount: productCount[0].productCount,
      orderCount: orderCount[0].orderCount,
      messageCount: messageCount[0].messageCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Грешка при извличане на броя!" });
  }
});

export default router;
