/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaginationButtons from "../layouts/others/PaginationButtons";
import BasicSelect from "../layouts/others/Select";
import {
  productCategories,
  materialOptions,
  matboardMaterialOptions,
  gobelinTypesOptions,
} from "../utils/selectOptions";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DashboardProductsContainer({ productsUpdated }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Всички");
  const [activeMaterial, setActiveMaterial] = useState("Всички");
  const [activeType, setActiveType] = useState("Всички");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    fetchProductsByCategory(activeCategory, 1);
  }, [activeCategory, activeMaterial, activeType, productsUpdated]);

  const fetchProductsByCategory = async (productCategory, pageNumber = 1) => {
    try {
      setLoading(true);
      let url = `${apiUrl}/admin/dashboard/products`;
      if (productCategory !== "Всички") {
        url += `/${productCategory}`;
      }
      const response = await axios.get(
        `${url}?material=${activeMaterial}&type=${activeType}`
      );
      const { data } = response;
      setProducts(data);
      setLoading(false);
      setError(null);
      setActiveCategory(productCategory);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Грешка при извличане на продуктите:", error);
      setError("Грешка при зареждане на продуктите!");
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSearchTerm("");
    setActiveCategory(category);
    setActiveMaterial("Всички");
    setActiveType("Всички");
    fetchProductsByCategory(category, 1);
  };

  const handleMaterialChange = (material) => {
    setActiveMaterial(material);
    fetchProductsByCategory(activeCategory, 1);
  };

  const handleTypeChange = (purpose) => {
    setActiveType(purpose);
    fetchProductsByCategory(activeCategory, 1);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${apiUrl}/admin/dashboard/products/${productId}`
      );
      if (response.status === 200) {
        const updatedProducts = products.filter(
          (product) => product.product_id !== productId
        );
        setProducts(updatedProducts);

        if (updatedProducts.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        setError(null);
      } else {
        throw new Error("Неуспешно изтриване на продукта!");
      }
    } catch (error) {
      console.error("Грешка при изтриване на продукта:", error);
      setError("Грешка при изтриване на продукта!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter(
      (product) =>
        activeMaterial === "Всички" ||
        product.product_material === activeMaterial
    )
    .filter(
      (product) =>
        activeType === "Всички" || product.product_type === activeType
    )
    .filter((product) => {
      const productName = product.product_name.toLowerCase();
      const categoryName = product.product_category.toLowerCase();
      return (
        productName.includes(searchTerm) || categoryName.includes(searchTerm)
      );
    });

  const currentProductsOnPage = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="view-products-container">
      <h2 className="products-dashboard-titles">Филтриране на продукти</h2>
      <div className="dashboard-filter-inputs"></div>
      <div className="select-container">
        <BasicSelect
          label="Категория"
          labelId="category-select-label"
          value={activeCategory}
          menuItems={productCategories}
          handleChange={handleCategoryChange}
          fullWidth
        />
      </div>
      {(activeCategory === "Рамки" || activeCategory === "Профили") && (
        <div className="select-container">
          <BasicSelect
            label="Материал"
            labelId="material-select-label"
            value={activeMaterial}
            menuItems={materialOptions}
            handleChange={handleMaterialChange}
            fullWidth
          />
        </div>
      )}
      {activeCategory === "Паспарту" && (
        <div className="select-container">
          <BasicSelect
            label="Материал"
            labelId="material-select-label"
            value={activeMaterial}
            menuItems={matboardMaterialOptions}
            handleChange={handleMaterialChange}
            fullWidth
          />
        </div>
      )}
      {activeCategory === "Гоблени" && (
        <div className="select-container">
          <BasicSelect
            label="Вид"
            labelId="purpose-select-label"
            value={activeType}
            menuItems={gobelinTypesOptions}
            handleChange={handleTypeChange}
            fullWidth
          />
        </div>
      )}
      <input
        type="text"
        className="dashboard-and-calculator-search-inputs"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Търсене..."
      />
      {loading ? (
        <p>Зареждане...</p>
      ) : error ? (
        <p>{error}</p>
      ) : currentProductsOnPage.length > 0 ? (
        <>
          <div className="dashboard-products-container">
            {currentProductsOnPage.map((filteredProduct) => (
              <div className="product-card" key={filteredProduct.product_id}>
                {filteredProduct.product_image_path && (
                  <img
                    src={`/${filteredProduct.product_image_path}`}
                    alt={filteredProduct.product_name_path}
                    className="product-image"
                  />
                )}
                <div className="product-details">
                  <div className="name-and-price-container">
                    <h3 className="product-name">
                      {filteredProduct.product_name}
                    </h3>
                    {filteredProduct.product_category !== "Рамки" && (
                      <p>
                        Цена: {filteredProduct.product_price} лв.
                        {filteredProduct.product_category === "Профили" && "/м"}
                        {filteredProduct.product_category === "Паспарту" &&
                          "/бр."}
                      </p>
                    )}
                  </div>
                  <div className="product-card-buttons-container">
                    <button
                      className="delete-buttons"
                      onClick={() =>
                        handleDeleteProduct(filteredProduct.product_id)
                      }
                    >
                      Изтрий
                    </button>
                    <Link
                      to={`/admin/dashboard/products/edit/${filteredProduct.product_id}`}
                    >
                      Редактирай
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationButtons
            productsPerPage={productsPerPage}
            totalProducts={currentProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <p className="no-products-message">
          Няма налични продукти от избраната филтрация!
        </p>
      )}
    </div>
  );
}
