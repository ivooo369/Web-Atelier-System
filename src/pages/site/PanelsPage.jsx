/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import useProductSorting from "../../utils/useProductSorting";
import { sortOptions } from "../../utils/sortOptions";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PanelsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;

  const { products, sortOption, handleSortChange, setProducts } =
    useProductSorting([]);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/panels`);
        handleSortChange("");
        handleSortChange("name_asc");
        setProducts(response.data);
      } catch (error) {
        console.error("Грешка при извличане на паната:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanels();
  }, []);

  const indexOfLastPanel = currentPage * productsPerPage;
  const indexOfFirstPanel = indexOfLastPanel - productsPerPage;
  const currentPanels = products.slice(indexOfFirstPanel, indexOfLastPanel);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">edit_document</span>
        <h1>Пана</h1>
      </header>
      <div className="paginations-and-select-containers">
        <BasicSelect
          label="Сортиране"
          labelId="sort-select-label"
          menuItems={sortOptions}
          value={sortOption}
          handleChange={handleSortChange}
          fullWidth
        />
        {loading || products.length > 0 ? (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={products.length}
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
      ) : products.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentPanels.map((panel) => (
              <ProductCard product={panel} key={panel.product_id} />
            ))}
          </div>
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={products.length}
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
