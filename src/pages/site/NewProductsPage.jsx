import { useEffect, useState } from "react";
import "../../styles/site/NewProductsPage.css";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import { productCategories } from "../../utils/selectOptions";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function NewProductsPage() {
  const [newProducts, setNewProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/new-products`);
        const sortedProducts = response.data.sort((a, b) => {
          return (
            new Date(b.product_release_date) - new Date(a.product_release_date)
          );
        });
        setNewProducts(sortedProducts);
      } catch (error) {
        console.error("Грешка при извличане на новите продукти:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "" || selectedCategory === "Всички"
      ? newProducts
      : newProducts.filter(
          (product) => product.product_category === selectedCategory
        );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">grid_view</span>
        <h1>Нови продукти</h1>
      </header>
      <div className="paginations-and-select-containers">
        <BasicSelect
          label="Избери категория"
          labelId="category-select-label"
          menuItems={productCategories}
          value={selectedCategory}
          handleChange={handleCategoryChange}
          fullWidth
        />
        {loading || filteredProducts.length > 0 ? (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : null}
      </div>
      {loading ? (
        <div className="loading-container">
          {[...Array(productsPerPage)].map((_, index) => (
            <Skeleton key={index} animation="wave" height={150} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentProducts.map((product) => (
              <ProductCard product={product} key={product.product_id} />
            ))}
          </div>
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <p className="no-products-found-message">Няма намерени продукти!</p>
      )}
    </div>
  );
}
