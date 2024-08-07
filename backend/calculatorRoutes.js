import express from "express";
import mysql from "mysql2/promise";
import config from "./db.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;

    const connection = await pool.getConnection();
    let queryString =
      "SELECT product_id, product_name, product_material, product_image_path FROM products";

    if (category) {
      queryString += ` WHERE product_category = '${category}'`;
    }

    const [rows] = await connection.query(queryString);
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Грешка при извличане на рамките:", error);
    res.status(500).json({ error: "Грешка при извличане на рамките!" });
  }
});

router.get("/price", async (req, res) => {
  try {
    const frameName = req.query.frameName;
    const connection = await pool.getConnection();

    const [profileRows] = await connection.query(
      "SELECT product_price FROM products WHERE product_name = ? AND product_category = ?",
      [frameName, "Профили"]
    );

    const [laborRows] = await connection.query(
      "SELECT product_price FROM products WHERE product_name = ? AND product_category = ?",
      [frameName, "Рамки"]
    );

    connection.release();

    if (profileRows.length === 0 || laborRows.length === 0) {
      return res.status(404);
    }

    return res.status(200).json({
      profilePrice: parseFloat(profileRows[0].product_price),
      laborPrice: parseFloat(laborRows[0].product_price),
    });
  } catch (error) {
    console.error("Грешка при извличане на цените:", error);
    return res
      .status(500)
      .json({ error: "Възникна вътрешна грешка в сървъра!" });
  }
});

router.post("/cart", async (req, res) => {
  const orderData = req.body;

  try {
    const connection = await pool.getConnection();

    let customerId = null;
    if (orderData.customerEmail) {
      const [customerRows] = await connection.query(
        "SELECT customer_id FROM customers WHERE customer_email = ?",
        [orderData.customerEmail]
      );

      if (customerRows.length > 0) {
        customerId = customerRows[0].customer_id;
      }
    }

    if (
      !orderData.customerName ||
      !orderData.customerCity ||
      !orderData.customerAddress ||
      !orderData.customerEmail ||
      !orderData.customerPhone
    ) {
      connection.release();
      return res
        .status(400)
        .json({ error: "Моля, попълнете всички задължителни полета!" });
    }
    if (!orderData.orderItems || orderData.orderItems.length === 0) {
      connection.release();
      return res.status(400).json({ error: "Няма артикули в поръчката!" });
    }

    const orderQuery = `
      INSERT INTO orders 
        (order_customer_id, order_customer_name, order_customer_city, order_customer_address, order_customer_email, 
        order_customer_phone, order_additional_info, order_submission_date, order_items) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const orderValues = [
      customerId,
      orderData.customerName,
      orderData.customerCity,
      orderData.customerAddress,
      orderData.customerEmail,
      orderData.customerPhone,
      orderData.additionalInformation,
      new Date(),
      JSON.stringify(orderData.orderItems),
    ];
    await connection.query(orderQuery, orderValues);

    connection.release();
    res.status(200).json({ message: "Поръчката е успешно добавена!" });
  } catch (error) {
    console.error("Грешка при добавяне на поръчката в базата данни:", error);
    res
      .status(500)
      .json({ error: "Вътрешна грешка при запис в базата данни!" });
  }
});

router.get("/cart/user", async (req, res) => {
  const { email } = req.query;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM customers WHERE customer_email = ?",
      [email]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Потребителят не е намерен!" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Грешка при извличане на данните за потребителя:", error);
    return res.status(500).json({ error: "Вътрешна грешка в сървъра!" });
  }
});

export default router;
