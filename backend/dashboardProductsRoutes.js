import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import config from "./db.config.js";
import cloudinary from "../cloudinary.config.js";

const router = express.Router();
const pool = mysql.createPool(config);

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM products");
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Грешка при зареждане на новите продукти!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productMaterial,
      productType,
      productWidth,
      productHeight,
      productPrice,
      productDescription,
    } = req.body;

    let cloudinaryImageUrl;
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "BRIKS",
      });
      cloudinaryImageUrl = result.secure_url;
    }

    const connection = await pool.getConnection();
    const [existingProduct] = await connection.query(
      "SELECT * FROM products WHERE product_category = ? AND product_name = ?",
      [productCategory, productName]
    );

    if (existingProduct.length > 0) {
      connection.release();
      return res
        .status(409)
        .json({ error: "Вече има продукт от тази категория със същото име!" });
    }

    let query;
    let queryValues;

    switch (productCategory) {
      case "Паспарту":
        query =
          "INSERT INTO products (product_category, product_name, product_material, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        queryValues = [
          productCategory,
          productName,
          productMaterial,
          productWidth,
          productHeight,
          productPrice,
          productDescription,
          cloudinaryImageUrl,
        ];
        break;
      case "Гоблени":
        query =
          "INSERT INTO products (product_category, product_name, product_type, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        queryValues = [
          productCategory,
          productName,
          productType,
          productWidth,
          productHeight,
          productPrice,
          productDescription,
          cloudinaryImageUrl,
        ];
        break;
      case "Пана":
      case "Огледала":
      case "Икони":
        query =
          "INSERT INTO products (product_category, product_name, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
        queryValues = [
          productCategory,
          productName,
          productWidth,
          productHeight,
          productPrice,
          productDescription,
          cloudinaryImageUrl,
        ];
        break;
      case "Арт материали":
        query =
          "INSERT INTO products (product_category, product_name, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?)";
        queryValues = [
          productCategory,
          productName,
          productPrice,
          productDescription,
          cloudinaryImageUrl,
        ];
        break;
      default:
        query =
          "INSERT INTO products (product_category, product_name, product_material, product_type, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        queryValues = [
          productCategory,
          productName,
          productMaterial,
          productType,
          productWidth,
          productHeight,
          productPrice,
          productDescription,
          cloudinaryImageUrl,
        ];
        break;
    }

    const [result] = await connection.query(query, queryValues);
    connection.release();

    res.status(201).json({
      message: "Продуктът е добавен успешно!",
      productId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при добавянето на продукта!" });
  }
});

router.get("/:productCategory", async (req, res) => {
  const { productCategory } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE product_category = ?",
      [productCategory]
    );
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при зареждане на продуктите!" });
  }
});

router.get("/edit/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const connection = await pool.getConnection();
    const [product] = await connection.query(
      "SELECT * FROM products WHERE product_id = ?",
      [productId]
    );
    connection.release();

    if (product.length === 0) {
      res.status(404).json({ error: "Продуктът не е намерен!" });
      return;
    }

    res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Възникна грешка при зареждане на продукта за редактиране!",
    });
  }
});

router.put("/edit/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const {
      productName,
      productCategory,
      productMaterial,
      productType,
      productWidth,
      productHeight,
      productPrice,
      productDescription,
    } = req.body;

    let cloudinaryImageUrl;
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "BRIKS",
      });
      cloudinaryImageUrl = result.secure_url;
    }

    const connection = await pool.getConnection();

    let query;
    let queryValues;

    if (cloudinaryImageUrl) {
      const [oldProduct] = await connection.query(
        "SELECT product_image_path FROM products WHERE product_id = ?",
        [productId]
      );
      const oldImageUrl = oldProduct[0].product_image_path;

      switch (productCategory) {
        case "Паспарту":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productMaterial,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            cloudinaryImageUrl,
            new Date(),
            productId,
          ];
          break;
        case "Гоблени":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productType,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            cloudinaryImageUrl,
            new Date(),
            productId,
          ];
          break;
        case "Пана":
        case "Огледала":
        case "Икони":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            cloudinaryImageUrl,
            new Date(),
            productId,
          ];
          break;
        case "Арт материали":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productPrice,
            productDescription,
            cloudinaryImageUrl,
            new Date(),
            productId,
          ];
          break;
        default:
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productMaterial,
            productType,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            cloudinaryImageUrl,
            new Date(),
            productId,
          ];
          break;
      }

      await connection.query(query, queryValues);

      if (oldImageUrl) {
        const publicId = path.basename(oldImageUrl, path.extname(oldImageUrl));
        await cloudinary.v2.uploader.destroy(`BRIKS/${publicId}`);
      }
    } else {
      switch (productCategory) {
        case "Паспарту":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productMaterial,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            new Date(),
            productId,
          ];
          break;
        case "Гоблени":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productType,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            new Date(),
            productId,
          ];
          break;
        case "Пана":
        case "Огледала":
        case "Икони":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            new Date(),
            productId,
          ];
          break;
        case "Арт материали":
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productPrice,
            productDescription,
            new Date(),
            productId,
          ];
          break;
        default:
          query =
            "UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?";
          queryValues = [
            productCategory,
            productName,
            productMaterial,
            productType,
            productWidth,
            productHeight,
            productPrice,
            productDescription,
            new Date(),
            productId,
          ];
          break;
      }

      await connection.query(query, queryValues);
    }

    connection.release();

    res.status(200).json({ message: "Продуктът е успешно редактиран!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при редактиране на продукта!" });
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const connection = await pool.getConnection();

    const [product] = await connection.query(
      "SELECT product_image_path FROM products WHERE product_id = ?",
      [productId]
    );

    if (product.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Продуктът не е намерен!" });
    }

    const imagePath = product[0].product_image_path;

    await connection.query("DELETE FROM products WHERE product_id = ?", [
      productId,
    ]);

    connection.release();

    res.status(200).json({ message: "Продуктът е изтрит успешно!" });

    if (imagePath) {
      const publicId = path.basename(imagePath, path.extname(imagePath));
      await cloudinary.v2.uploader.destroy(`BRIKS/${publicId}`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Възникна грешка при изтриване на продукта!" });
  }
});

export default router;
