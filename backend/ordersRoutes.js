import express from 'express';
import mysql from 'mysql2/promise';
import config from './db.config.js';

const router = express.Router();
const pool = mysql.createPool(config);

router.get('/', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT *, JSON_UNQUOTE(order_items) as order_items FROM orders');
      connection.release();
  
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна вътрешна грешка в сървъра!' });
    }
  });

  router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM orders WHERE order_id = ?', [orderId]);
      connection.release();
      res.status(200).json({ message: 'Поръчката е изтрита успешно!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Възникна грешка при изтриване на поръчката!' });
    }
  });
  
  export default router;
