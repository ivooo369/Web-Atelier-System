import "../../styles/site/ProductDetailsPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/products/details/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Грешка при извличане на детайлите за продукта:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="pages">
        <header className="page-header">
          <h1>Детайли за продукта</h1>
        </header>
        <div className="product-details-container">
          <Skeleton variant="text" width="60%" animation="wave" />
          <Skeleton variant="rectangular" height={400} animation="wave" />
          <Skeleton variant="text" width="80%" animation="wave" />
          <Skeleton variant="text" width="70%" animation="wave" />
          <Skeleton variant="text" width="80%" animation="wave" />
          <Skeleton variant="text" width="50%" animation="wave" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <p>Няма намерени данни за продукта!</p>;
  }

  return (
    <div className="pages">
      <header className="page-header">
        <h1>Детайли за продукта</h1>
      </header>
      <div className="product-details-container">
        <div className="name-and-category-container">
          <h2 className="product-name-details-page">{product.product_name}</h2>
          <p>
            Категория:{" "}
            <span style={{ fontWeight: "bold" }}>
              {product.product_category}
            </span>
          </p>
        </div>
        <img
          src={`${product.product_image_path}`}
          alt={`${product.product_name}`}
          className="details-page-image"
        />
        {product.product_category === "Рамки" && (
          <Link
            to={`/calculator?frameName=${product.product_name}&framePath=${product.product_image_path}`}
          >
            <button className="calculate-buttons">
              <span className="material-symbols-outlined">calculate</span>
              Калкулирай
            </button>
          </Link>
        )}
        <div className="width-height-price-container">
          {product.product_category !== "Арт материали" && (
            <p>
              Ширина: <span>{product.product_width} мм</span>
            </p>
          )}
          {product.product_category !== "Арт материали" && (
            <p>
              Височина: <span>{product.product_height} мм</span>
            </p>
          )}
          {product.product_category !== "Рамки" && (
            <p className="product-price">
              Цена: {product.product_price} лв.
              {product.product_category === "Профили" && "/м"}
              {product.product_category === "Паспарту" && "/бр."}
            </p>
          )}
        </div>
        <p
          style={{
            display:
              product.product_category === "Рамки" ||
              product.product_category === "Профили" ||
              product.product_category === "Паспарту"
                ? "block"
                : "none",
          }}
        >
          Материал: <span>{product.product_material}</span>
        </p>
        <p
          style={{
            display:
              product.product_category === "Рамки" ||
              product.product_category === "Профили" ||
              product.product_category === "Гоблени"
                ? "block"
                : "none",
          }}
        >
          {product.product_category === "Гоблени" ? "Вид" : "Предназначение"}:{" "}
          <span>{product.product_type}</span>
        </p>
        <p className="product-description">{product.product_description}</p>
      </div>
    </div>
  );
}
