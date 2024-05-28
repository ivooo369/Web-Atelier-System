import path from 'path'; // Import the path module

import express from 'express';
import cors from 'cors';
import authRouter from './auth.js'; 
import siteProductsRoutes from './siteProductsRoutes.js';
import contactsRoutes from './contactsRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import dashboardProductsRoutes from './dashboardProductsRoutes.js';
import messagesRoutes from './messagesRoutes.js';
import ordersRoutes from "./ordersRoutes.js"
import calculatorRoutes from './calculatorRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(authRouter);
app.use('/products', siteProductsRoutes);
app.use('/contacts', contactsRoutes);
app.use('/admin/dashboard', dashboardRoutes);
app.use('/admin/dashboard/products', dashboardProductsRoutes);
app.use('/admin/dashboard/messages', messagesRoutes);
app.use('/admin/dashboard/orders', ordersRoutes);
app.use('/calculator', calculatorRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сървърът е стартиран на порт ${PORT}`);
});