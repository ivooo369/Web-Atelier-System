import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 
import authUserRouter from './authUserRoutes.js';
import authAdminRouter from './authAdminRoutes.js';
import siteProductsRoutes from './siteProductsRoutes.js';
import contactsRoutes from './contactsRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import dashboardProductsRoutes from './dashboardProductsRoutes.js';
import messagesRoutes from './messagesRoutes.js';
import ordersRoutes from "./ordersRoutes.js"
import calculatorRoutes from './calculatorRoutes.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets', express.static(path.join(__dirname, '..', 'dist', 'assets')));

app.use(authUserRouter);
app.use(authAdminRouter);
app.use('/products', siteProductsRoutes);
app.use('/contacts', contactsRoutes);
app.use('/admin/dashboard', dashboardRoutes);
app.use('/admin/dashboard/products', dashboardProductsRoutes);
app.use('/admin/dashboard/messages', messagesRoutes);
app.use('/admin/dashboard/orders', ordersRoutes);
app.use('/calculator', calculatorRoutes);

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Сървърът е стартиран на порт ${port}`);
});
