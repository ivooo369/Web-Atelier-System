import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SearchResultsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("name");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/products/search?name=${encodeURIComponent(searchTerm)}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="results-page pages">
      <header className="page-header">
        <span className="material-symbols-outlined">search</span>
        <h1>Резултати от търсенето</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton-product-card">
              <Skeleton animation="wave" height={150} />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="products-grid-container">
          {products.map((product) => (
            <ProductCard product={product} key={product.product_id} />
          ))}
        </div>
      ) : (
        <p className="no-products-found-message">Няма намерени продукти!</p>
      )}
    </div>
  );
}
