import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function CalculatorHeader() {
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (location.pathname === "/calculator") {
      document.title = "БРИКС ООД / Калкулатор";
    } else {
      document.title = "БРИКС ООД / Количка";
    }
  }, [location.pathname]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(cart.length);
  }, [location.pathname]);

  return (
    <>
      <header className="calculator-header">
        <Link to="/calculator" className="calculator-links">
          <h2 className="calculator-title">
            БРИКС ООД /{" "}
            {location.pathname === "/calculator" ? "Калкулатор" : "Количка"}
          </h2>
        </Link>
        <div className="buttons-container">
          {location.pathname === "/calculator" && (
            <Link to="/calculator/cart" className="calculator-links">
              <Button
                variant="contained"
                className="link-buttons"
                id="shopping-cart-button"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Количка ({cartItemCount})
              </Button>
            </Link>
          )}
          {location.pathname === "/calculator" && (
            <Button
              variant="contained"
              className="link-buttons"
              id="refresh-button"
              onClick={() => window.location.reload()}
            >
              <span className="material-symbols-outlined">refresh</span>
              Нулирай
            </Button>
          )}
          {location.pathname === "/calculator/cart" && (
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
