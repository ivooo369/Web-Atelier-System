import cloudinary from "cloudinary";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "backend", ".env") });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
