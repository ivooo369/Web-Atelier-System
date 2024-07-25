import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import authRouter from "./authUserRoutes.js";
import authAdminRouter from "./authAdminRoutes.js";
import siteProductsRoutes from "./siteProductsRoutes.js";
import contactsRoutes from "./contactsRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import dashboardProductsRoutes from "./dashboardProductsRoutes.js";
import messagesRoutes from "./messagesRoutes.js";
import ordersRoutes from "./ordersRoutes.js";
import calculatorRoutes from "./calculatorRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://website-project-lbpd.onrender.com",
  ],
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "data:",
        "https://api.maptiler.com",
        "https://unpkg.com",
        "https://res.cloudinary.com",
      ],
      scriptSrc: ["'self'", "https://unpkg.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://unpkg.com",
        "https://fonts.googleapis.com",
      ],
      styleSrcElem: [
        "'self'",
        "'unsafe-inline'",
        "https://unpkg.com",
        "https://fonts.googleapis.com",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.maptiler.com"],
    },
  })
);

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "dist", "assets"))
);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/auth-user", authRouter);
app.use("/api/auth-admin", authAdminRouter);
app.use("/api/products", siteProductsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/dashboard/products", dashboardProductsRoutes);
app.use("/api/admin/dashboard/messages", messagesRoutes);
app.use("/api/admin/dashboard/orders", ordersRoutes);
app.use("/api/calculator", calculatorRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Сървърът е стартиран на порт: ${port}`);
});
