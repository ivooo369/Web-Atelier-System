/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import useProductSorting from "../../components/useProductSorting";
import { sortOptions } from "../../utils/sortOptions";
import {
  materialOptions,
  profileUsageOptions,
} from "../../utils/selectOptions";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfilesPage() {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedUsage, setSelectedUsage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const { products, sortOption, handleSortChange, setProducts } =
    useProductSorting([]);

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setCurrentPage(1);
  };

  const handleUsageChange = (usage) => {
    setSelectedUsage(usage);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/profiles`);
        handleSortChange("");
        handleSortChange("name_asc");
        setProducts(response.data);
      } catch (error) {
        console.error("Грешка при извличане на профилите:", error);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = products.filter((profile) => {
    const matchMaterial =
      selectedMaterial === "" || selectedMaterial === "Всички"
        ? true
        : profile.product_material === selectedMaterial;

    const matchUsage =
      selectedUsage === "" || selectedUsage === "Всичко"
        ? true
        : profile.product_type === selectedUsage;

    return matchMaterial && matchUsage;
  });

  const indexOfLastProfile = currentPage * productsPerPage;
  const indexOfFirstProfile = indexOfLastProfile - productsPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container">
      <header className="page-header">
        <span className="material-symbols-outlined">photo_library</span>
        <h1>Профили</h1>
      </header>
      <div className="paginations-and-select-containers">
        <div className="select-containers">
          <BasicSelect
            label="Избери материал"
            labelId="material-select-label"
            menuItems={materialOptions}
            value={selectedMaterial}
            handleChange={handleMaterialChange}
            fullWidth
          />
          <BasicSelect
            label="Избери предназначение"
            labelId="usage-select-label"
            menuItems={profileUsageOptions}
            value={selectedUsage}
            handleChange={handleUsageChange}
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
        {filteredProfiles.length > 0 && (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredProfiles.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
      {filteredProfiles.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentProfiles.map((profile) => (
              <ProductCard product={profile} key={profile.product_id} />
            ))}
          </div>
          {filteredProfiles.length > 0 && (
            <PaginationButtons
              productsPerPage={productsPerPage}
              totalProducts={filteredProfiles.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      ) : (
        <p className="no-products-found-message">Няма намерени продукти!</p>
      )}
    </div>
  );
}
