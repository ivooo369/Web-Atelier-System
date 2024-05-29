import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

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
          `https://website-project-lbpd.onrender.com/products/search?name=${encodeURIComponent(
            searchTerm
          )}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="results-page">
      <header className="page-header">
        <span className="material-symbols-outlined">search</span>
        <h1>Резултати от търсенето</h1>
      </header>
      {loading ? (
        <p>Loading...</p>
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
