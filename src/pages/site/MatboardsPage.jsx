/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import useProductSorting from "../../utils/useProductSorting";
import { sortOptions } from "../../utils/sortOptions";
import { matboardMaterialOptions } from "../../utils/selectOptions";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function MatboardsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;

  const { products, sortOption, handleSortChange, setProducts } =
    useProductSorting([]);

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMatboards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/matboards`);
        handleSortChange("");
        handleSortChange("name_asc");
        setProducts(response.data);
      } catch (error) {
        console.error("Грешка при извличане на паспартутата:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatboards();
  }, []);

  const filteredMatboards =
    selectedMaterial === "" || selectedMaterial === "Всички"
      ? products
      : products.filter(
          (matboard) => matboard.product_material === selectedMaterial
        );

  const indexOfLastMatboard = currentPage * productsPerPage;
  const indexOfFirstMatboard = indexOfLastMatboard - productsPerPage;
  const currentMatboards = filteredMatboards.slice(
    indexOfFirstMatboard,
    indexOfLastMatboard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">draft</span>
        <h1>Паспарту</h1>
      </header>
      <div className="paginations-and-select-containers">
        <div className="select-containers">
          <BasicSelect
            label="Избери материал"
            labelId="material-select-label"
            menuItems={matboardMaterialOptions}
            value={selectedMaterial}
            handleChange={handleMaterialChange}
            fullWidth
          />
          <BasicSelect
            label="Сортиране"
            labelId="sort-select-label"
            menuItems={sortOptions}
            value={sortOption}
            handleChange={handleSortChange}
            fullWidth
          />
        </div>
        {loading || filteredMatboards.length > 0 ? (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredMatboards.length}
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
      ) : filteredMatboards.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentMatboards.map((matboard) => (
              <ProductCard product={matboard} key={matboard.product_id} />
            ))}
          </div>
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredMatboards.length}
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
