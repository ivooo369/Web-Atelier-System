import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function CalculatorHeader() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/calculator") {
      document.title = "БРИКС ООД / Калкулатор";
      return "Калкулатор";
    } else {
      document.title = "БРИКС ООД / Количка";
      return "Количка";
    }
  };

  return (
    <>
      <header className="calculator-header">
        <Link to="/calculator" className="calculator-links">
          <h2>БРИКС ООД / {getTitle()}</h2>
        </Link>
        <div className="buttons-container">
          <Link to="/calculator/cart" className="calculator-links">
            <Button
              variant="contained"
              className="link-buttons"
              id="shopping-cart-button"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Количка
            </Button>
          </Link>
          {getTitle() === "Калкулатор" && (
            <Button
              variant="contained"
              className="link-buttons"
              id="start-over-button"
            >
              <span className="material-symbols-outlined">refresh</span>
              Започни отначало
            </Button>
          )}
          {getTitle() === "Количка" && (
            <Link to="/calculator" className="calculator-links">
              <Button
                variant="contained"
                className="link-buttons"
                id="return-to-calculator-button"
              >
                <span className="material-symbols-outlined">refresh</span>Към
                калкулатора
              </Button>
            </Link>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
