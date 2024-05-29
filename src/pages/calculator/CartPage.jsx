import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PurchaseForm from "../../components/PurchaseForm";
import Cart from "../../components/Cart";
import "../../styles/calculator/CartPage.css";

export default function CartPage() {
  const [userData, setUserData] = useState({
    name: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    additionalInformation: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const customerEmail = localStorage.getItem("customerEmail");
    if (customerEmail) {
      axios
        .get(
          `https://website-project-lbpd.onrender.com/calculator/cart/user/?email=${customerEmail}`
        )
        .then((response) => {
          const user = response.data;
          setUserData({
            name: user.customer_name,
            city: user.customer_city,
            address: user.customer_address,
            email: user.customer_email,
            phone: user.customer_phone,
          });
        })
        .catch((error) => {
          console.error(
            "Грешка при извличане на данните на потребителя:",
            error
          );
        });
    }
  }, []);

  useEffect(() => {
    const fetchCartItems = () => {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems);

      const total = storedCartItems.reduce(
        (acc, item) => acc + parseFloat(item.price * item.framesQuantity),
        0
      );
      setTotalPrice(total);
    };

    fetchCartItems();
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalPrice(0);
  };

  const deleteItem = (indexToDelete) => {
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== indexToDelete
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

    const total = updatedCartItems.reduce(
      (acc, item) => acc + parseFloat(item.price * item.framesQuantity),
      0
    );
    setTotalPrice(total);
  };

  return (
    <div className="cart-page">
      <div className="content-containers">
        <div className="titles-container">
          <h1>Количка ({cartItems.length})</h1>
        </div>
        <div className="cart-and-purchase-content">
          <Cart cartItems={cartItems} deleteItem={deleteItem} />
          <p className="total-price-text">
            <b>Общо: </b>
            <b className="total-price-value">{totalPrice.toFixed(2)} лв.</b>
          </p>
          <Button
            variant="contained"
            id="cart-clear-button"
            onClick={clearCart}
          >
            Изчисти количката
          </Button>
        </div>
      </div>
      <div className="content-containers">
        <div className="titles-container">
          <h1>Поръчай</h1>
        </div>
        <div className="cart-and-purchase-content purchase-content">
          <PurchaseForm
            userData={userData}
            setUserData={setUserData}
            cartItems={cartItems}
            clearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
}
