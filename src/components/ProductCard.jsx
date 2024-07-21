/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card" key={product.product_id}>
      <img
        src={`${product.product_image_path}`}
        alt={product.product_name}
        className="product-image"
      />
      <p className="product-category">
        {product.product_category === "Рамки" ||
        product.product_category === "Профили" ||
        product.product_category === "Паспарту" ? (
          <span>
            <span>{product.product_category} от </span>
            <span className="product-material">{product.product_material}</span>
          </span>
        ) : product.product_category === "Гоблени" ? (
          <span>
            <span>{product.product_category} от тип </span>
            <span className="product-material">{product.product_type}</span>
          </span>
        ) : (
          product.product_category
        )}
      </p>
      <div className="name-and-price"></div>
      <h3 className="product-name">{product.product_name}</h3>
      {product.product_category !== "Рамки" && (
        <p className="product-price">
          Цена: {product.product_price} лв.
          {product.product_category === "Профили" && "/м"}
          {product.product_category === "Паспарту" && "/бр."}
        </p>
      )}
      <div className="product-card-buttons">
        <Link
          to={`/calculator?frameName=${product.product_name}&framePath=${product.product_image_path}`}
        >
          {product.product_category === "Рамки" && (
            <button className="calculate-buttons">
              <span className="material-symbols-outlined">calculate</span>
              Калкулирай
            </button>
          )}
        </Link>
        <Link to={`/products/${product.product_id}`}>
          <button className="details-buttons">Детайли</button>
        </Link>
      </div>
    </div>
  );
}
