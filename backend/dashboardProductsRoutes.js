import express from 'express';
import mysql from 'mysql2/promise';
import config from './db.config.js';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { getDirName } from '../src/utils/getDirName.js';

const router = express.Router();

const __dirname = getDirName(import.meta.url);


// Update the path to go up one level to access the 'public' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'public', 'productImages');

    // Create the directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const pool = mysql.createPool(config);

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products');
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Грешка при зареждане на новите продукти!' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
      const {
          productName,
          productCategory,
          productMaterial,
          productType,
          productWidth,
          productHeight,
          productPrice,
          productDescription
      } = req.body;

      const productImagePath = req.file.path.replace('public', '');
      const connection = await pool.getConnection();

      const [existingProduct] = await connection.query(
          'SELECT * FROM products WHERE product_category = ? AND product_name = ?',
          [productCategory, productName]
      );

      if (existingProduct.length > 0) {
          connection.release();
          return res.status(409).json({ error: 'Вече има продукт от тази категория със същото име!' });
      }

      let query;
      let queryValues;

      switch (productCategory) {
          case "Паспарту":
              query = 'INSERT INTO products (product_category, product_name, product_material, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
              queryValues = [productCategory, productName, productMaterial, productWidth, productHeight, productPrice, productDescription, productImagePath];
              break;
          case "Гоблени":
              query = 'INSERT INTO products (product_category, product_name, product_type, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
              queryValues = [productCategory, productName, productType, productWidth, productHeight, productPrice, productDescription, productImagePath];
              break;
          case "Пана":
          case "Огледала":
          case "Икони":
              query = 'INSERT INTO products (product_category, product_name, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
              queryValues = [productCategory, productName, productWidth, productHeight, productPrice, productDescription, productImagePath];
              break;
          case "Арт материали":
              query = 'INSERT INTO products (product_category, product_name, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?)';
              queryValues = [productCategory, productName, productPrice, productDescription, productImagePath];
              break;
          default:
              query = 'INSERT INTO products (product_category, product_name, product_material, product_type, product_width, product_height, product_price, product_description, product_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
              queryValues = [productCategory, productName, productMaterial, productType, productWidth, productHeight, productPrice, productDescription, productImagePath];
              break;
      }

      const [result] = await connection.query(query, queryValues);
      connection.release();

      res.status(201).json({ message: 'Продуктът е добавен успешно!', productId: result.insertId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна грешка при добавянето на продукта!' });
  }
});

  router.get('/:productCategory', async (req, res) => {
    const { productCategory } = req.params;
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM products WHERE product_category = ?', [productCategory]);
      connection.release();
  
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна грешка при зареждане на продуктите!' });
    }
  });

  router.get('/edit/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const connection = await pool.getConnection();
        const [product] = await connection.query('SELECT * FROM products WHERE product_id = ?', [productId]);
        connection.release();

        if (product.length === 0) {
            res.status(404).json({ error: 'Продуктът не е намерен!' });
            return;
        }

        res.status(200).json(product[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Възникна грешка при зареждане на продукта за редактиране!' });
    }
});
  
router.put('/edit/:productId', upload.single('productImage'), async (req, res) => {
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
          productDescription
      } = req.body;

      let productImagePath;
      if (req.file && req.file.path) {
          productImagePath = req.file.path;
      }

      const connection = await pool.getConnection();

      let query;
      let queryValues;

      if (productImagePath) {
          const [oldProduct] = await connection.query('SELECT product_image_path FROM products WHERE product_id = ?', [productId]);
          const oldImagePath = oldProduct[0].product_image_path;

          switch (productCategory) {
              case "Паспарту":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productMaterial, productWidth, productHeight, productPrice, productDescription, productImagePath, new Date(), productId];
                  break;
              case "Гоблени":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productType, productWidth, productHeight, productPrice, productDescription, productImagePath, new Date(), productId];
                  break;
              case "Пана":
              case "Огледала":
              case "Икони":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productWidth, productHeight, productPrice, productDescription, productImagePath, new Date(), productId];
                  break;
              case "Арт материали":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productPrice, productDescription, productImagePath, new Date(), productId];
                  break;
              default:
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_image_path = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productMaterial, productType, productWidth, productHeight, productPrice, productDescription, productImagePath, new Date(), productId];
                  break;
          }

          await connection.query(query, queryValues);

          const [count] = await connection.query('SELECT COUNT(*) AS count FROM products WHERE product_image_path = ? AND product_id != ?', [oldImagePath, productId]);
          if (count[0].count === 0) {
              fs.unlinkSync(oldImagePath);
          }
      } else {
          switch (productCategory) {
              case "Паспарту":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productMaterial, productWidth, productHeight, productPrice, productDescription, new Date(), productId];
                  break;
              case "Гоблени":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productType, productWidth, productHeight, productPrice, productDescription, new Date(), productId];
                  break;
              case "Пана":
              case "Огледала":
              case "Икони":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productWidth, productHeight, productPrice, productDescription, new Date(), productId];
                  break;
              case "Арт материали":
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productPrice, productDescription, new Date(), productId];
                  break;
              default:
                  query = 'UPDATE products SET product_category = ?, product_name = ?, product_material = ?, product_type = ?, product_width = ?, product_height = ?, product_price = ?, product_description = ?, product_release_date = ? WHERE product_id = ?';
                  queryValues = [productCategory, productName, productMaterial, productType, productWidth, productHeight, productPrice, productDescription, new Date(), productId];
                  break;
          }

          await connection.query(query, queryValues);
      }

      connection.release();

      res.status(200).json({ message: 'Продуктът е успешно редактиран!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна грешка при редактиране на продукта!' });
  }
});
  
  router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const connection = await pool.getConnection();
      
      const [product] = await connection.query('SELECT product_image_path FROM products WHERE product_id = ?', [productId]);
      if (product.length === 0) {
        res.status(404).json({ error: 'Продуктът не е намерен!' });
        return;
      }
  
      const imagePath = product[0].product_image_path;
  
      await connection.query('DELETE FROM products WHERE product_id = ?', [productId]);
      connection.release();
      res.status(200).json({ message: 'Продуктът е изтрит успешно!' });
  
      const [count] = await connection.query('SELECT COUNT(*) AS count FROM products WHERE product_image_path = ?', [imagePath]);
      if (count[0].count === 0) {
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна грешка при изтриване на продукта!' });
    }
  });
  
  export default router;