/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import useProductSorting from "../../utils/useProductSorting";
import { sortOptions } from "../../utils/sortOptions";
import { gobelinTypesOptions } from "../../utils/selectOptions";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function GobelinsPage() {
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;

  const { products, sortOption, handleSortChange, setProducts } =
    useProductSorting([]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchGobelins = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/gobelins`);
        handleSortChange("");
        handleSortChange("name_asc");
        setProducts(response.data);
      } catch (error) {
        console.error("Грешка при извличане на гоблените:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGobelins();
  }, []);

  const filteredGobelins =
    selectedType === "" || selectedType === "Всички"
      ? products
      : products.filter((gobelin) => gobelin.product_type === selectedType);

  const indexOfLastGobelin = currentPage * productsPerPage;
  const indexOfFirstGobelin = indexOfLastGobelin - productsPerPage;
  const currentGobelins = filteredGobelins.slice(
    indexOfFirstGobelin,
    indexOfLastGobelin
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">imagesmode</span>
        <h1>Гоблени</h1>
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
        <BasicSelect
          label="Вид"
          labelId="sort-select-label"
          menuItems={gobelinTypesOptions}
          value={selectedType}
          handleChange={handleTypeChange}
          fullWidth
        />
        {loading || filteredGobelins.length > 0 ? (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredGobelins.length}
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
      ) : filteredGobelins.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentGobelins.map((gobelin) => (
              <ProductCard product={gobelin} key={gobelin.product_id} />
            ))}
          </div>
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredGobelins.length}
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
