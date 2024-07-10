import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.get("/new-products", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_release_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)"
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Грешка при зареждане на новите продукти!" });
  }
});

router.get("/frames", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Рамки"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Рамки"!',
    });
  }
});

router.get("/profiles", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Профили"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Профили"!',
    });
  }
});

router.get("/matboards", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Паспарту"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Паспарту"!',
    });
  }
});

router.get("/gobelins", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Гоблени"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Гоблени"!',
    });
  }
});

router.get("/panels", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Пана"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Пана"!',
    });
  }
});

router.get("/mirrors", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Огледала"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Огледала"!',
    });
  }
});

router.get("/icons", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Икони"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Икони"!',
    });
  }
});

router.get("/art-materials", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      ["Арт материали"]
    );
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Грешка при зареждане на продуктите от категория "Арт материали"!',
    });
  }
});

router.get("/details/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_id = ?",
      [productId]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Продуктът не е намерен!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Грешка при зареждане на данните за продукта!" });
  }
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.name;

  try {
    const connection = await pool.getConnection();
    let query = "SELECT * FROM products WHERE ";
    const queryParams = [];

    if (searchTerm) {
      query +=
        "(product_name LIKE ? OR product_category LIKE ? OR product_material LIKE ?)";
      queryParams.push(
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`
      );
    } else {
      query += "1";
    }

    const [rows] = await connection.query(query, queryParams);
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Грешка при търсене на продукти!" });
  }
});

export default router;
