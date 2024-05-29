import express from 'express';
import mysql from 'mysql2/promise';
import config from './db.config.js';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
import cors from 'cors'; 

const app = express();
const authAdminRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use(authAdminRouter);

const generateAdminToken = (adminId) => {
  const token = jwt.sign({ adminId }, 'adminAuthKey', { expiresIn: '1s' });
  return token;
};

authAdminRouter.post('/admin/login', async (req, res) => {
  const { adminUsername, adminPassword } = req.body; 

  try {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute('SELECT * FROM admin WHERE admin_username = ?', [adminUsername]);
    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Потребителят не е намерен!' });
    }

    const hashedPasswordFromDB = rows[0].admin_password;
    const match = await bcrypt.compare(adminPassword, hashedPasswordFromDB);

    if (!match) {
      return res.status(401).json({ message: 'Невалидни данни за вход!' });
    }

    const token = generateAdminToken(rows[0].userId); 
    res.status(200).json({ message: 'Влизането е успешно!', token });
  } catch (error) {
    res.status(500).json({ error: 'Грешка при влизане!' });
  }
});

export default authAdminRouter;