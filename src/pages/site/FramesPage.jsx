import { useState, useEffect } from "react";
import axios from "axios";
import PaginationButtons from "../../layouts/others/PaginationButtons";
import BasicSelect from "../../layouts/others/Select";
import ProductCard from "../../components/ProductCard";
import { frameSortOptions } from "../../utils/sortOptions";
import { materialOptions, frameUsageOptions } from "../../utils/selectOptions";

export default function FramesPage() {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedUsage, setSelectedUsage] = useState("");
  const [frames, setFrames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const productsPerPage = 20;

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setCurrentPage(1);
  };

  const handleUsageChange = (usage) => {
    setSelectedUsage(usage);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    if (option === sortOption) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortOption(option);
    }
  };

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(
          "https://website-project-lbpd.onrender.com/products/frames"
        );
        setFrames(response.data);
      } catch (error) {
        console.error("Грешка при извличане на рамките:", error);
      }
    };

    fetchFrames();
  }, []);

  const filteredFrames = frames.filter((frame) => {
    const matchMaterial =
      selectedMaterial === "" || selectedMaterial === "Всички"
        ? true
        : frame.product_material === selectedMaterial;

    const matchUsage =
      selectedUsage === "" || selectedUsage === "Всичко"
        ? true
        : frame.product_type === selectedUsage;

    return matchMaterial && matchUsage;
  });

  const sortedFrames = () => {
    if (sortOption === "name_asc" || sortOption === "name_desc") {
      return filteredFrames.slice().sort((a, b) => {
        if (sortOption === "name_asc") {
          return sortDirection === "asc"
            ? a.product_name.localeCompare(b.product_name)
            : b.product_name.localeCompare(a.product_name);
        } else {
          return sortDirection === "asc"
            ? b.product_name.localeCompare(a.product_name)
            : a.product_name.localeCompare(b.product_name);
        }
      });
    } else {
      return filteredFrames;
    }
  };

  const indexOfLastFrame = currentPage * productsPerPage;
  const indexOfFirstFrame = indexOfLastFrame - productsPerPage;
  const currentFrames = sortedFrames().slice(
    indexOfFirstFrame,
    indexOfLastFrame
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="site-products-container">
      <header className="page-header">
        <span className="material-symbols-outlined">photo_frame</span>
        <h1>Рамки</h1>
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
            menuItems={frameUsageOptions}
            value={selectedUsage}
            handleChange={handleUsageChange}
            fullWidth
          />
          <BasicSelect
            label="Сортиране"
            labelId="sort-select-label"
            menuItems={frameSortOptions}
            value={sortOption}
            handleChange={handleSortChange}
            fullWidth
          />
        </div>
        {filteredFrames.length > 0 && (
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={filteredFrames.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
      {filteredFrames.length > 0 ? (
        <div>
          <div className="products-grid-container">
            {currentFrames.map((frame) => (
              <ProductCard product={frame} key={frame.product_id} />
            ))}
          </div>
          {filteredFrames.length > 0 && (
            <PaginationButtons
              productsPerPage={productsPerPage}
              totalProducts={filteredFrames.length}
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
