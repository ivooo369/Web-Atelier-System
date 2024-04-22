import "../styles/CartPage.css";
import Button from "@mui/material/Button";
import "../layouts/others/PurchaseTable";
import PurchaseTable from "../layouts/others/PurchaseTable";
import PurchaseForm from "../layouts/others/PurchaseForm";

export default function CartPage() {
  return (
    <>
      <div className="cart-page">
        <div className="content-containers">
          <div className="titles-container">
            <h1>Количка</h1>
          </div>
          <div className="cart-and-purchase-content">
            <div className="cart-information">
              <PurchaseTable />
            </div>
            <p className="total-price-text">
              <b>Общо: </b>
              <b className="total-price-value">10.00 лв.</b>
            </p>
            <Button variant="contained" id="cart-clear-button">
              Изчисти количката
            </Button>
          </div>
        </div>
        <div className="content-containers">
          <div className="titles-container">
            <h1>Поръчай</h1>
          </div>
          <div className="cart-and-purchase-content purchase-content">
            <PurchaseForm />
            <Button variant="contained" id="confirm-purchase-button">
              Потвърди поръчката
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
