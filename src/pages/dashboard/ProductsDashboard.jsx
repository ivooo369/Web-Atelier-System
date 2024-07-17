import { useState } from "react";
import AddProductForm from "../../components/AddProductForm";
import DashboardProductsContainer from "../../components/DashboardProductsContainer";

export default function ProductsDashboard() {
  const [productsUpdated, setProductsUpdated] = useState(false);

  const handleProductsUpdate = () => {
    setProductsUpdated(!productsUpdated);
  };

  return (
    <div className="pages">
      <div className="page-header">
        <h1>Продукти</h1>
      </div>
      <div className="products-container">
        <AddProductForm onProductsUpdate={handleProductsUpdate} />
        <DashboardProductsContainer productsUpdated={productsUpdated} />
      </div>
    </div>
  );
}
