/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function PurchaseForm({
  userData,
  setUserData,
  cartItems,
  clearCart,
}) {
  const [emailError, setEmailError] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const customerEmail = localStorage.getItem("customerEmail");
    if (customerEmail) {
      axios
        .get(
          `http://localhost:3000/calculator/cart/user/?email=${customerEmail}`
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
  }, [setUserData]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const confirmPurchase = () => {
    if (
      !userData.name ||
      !userData.city ||
      !userData.address ||
      !userData.email ||
      !userData.phone
    ) {
      setNotification({
        message: "Моля, попълнете всички задължителни полета!",
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setNotification({
        message: "Невалиден формат на имейл адреса!.",
        type: "error",
      });
      return;
    }

    if (userData.phone.length !== 10 || !/^\d+$/.test(userData.phone)) {
      setNotification({
        message: "Телефонът трябва да съдържа точно 10 цифри!",
        type: "error",
      });
      return;
    }

    if (cartItems.length === 0) {
      setNotification({ message: "Количката е празна!", type: "error" });
      return;
    }

    const orderData = {
      customerName: userData.name,
      customerCity: userData.city,
      customerAddress: userData.address,
      customerEmail: userData.email,
      customerPhone: userData.phone,
      additionalInformation: userData.additionalInformation,
      orderItems: cartItems,
    };

    axios
      .post("http://localhost:3000/calculator/cart", orderData)
      .then((response) => {
        console.log(response.data);
        clearCart();
        setUserData({
          ...userData,
          additionalInformation: "",
        });
        setNotification({
          message: "Поръчката е успешно изпратена!",
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Грешка при изпращане на поръчка:", error);
        setNotification({
          message: "Грешка при изпращане на поръчката! Моля, опитайте отново!",
          type: "error",
        });
      });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserData({ ...userData, email: email });
    setEmailError(!validateEmail(email));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    if (/^\d*$/.test(phone) && phone.length <= 10) {
      setUserData({ ...userData, phone: phone });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1, mx: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="purchase-form">
        <div className="inputs-container">
          <div className="purchase-inputs">
            <TextField
              fullWidth
              required
              id="name"
              label="Име"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              required
              id="city"
              label="Град"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
            <TextField
              fullWidth
              required
              id="address"
              label="Адрес"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
            <TextField
              fullWidth
              required
              id="email"
              label="E-mail"
              value={userData.email}
              error={emailError}
              helperText={emailError ? "Невалиден имейл формат" : ""}
              onChange={handleEmailChange}
            />
            <TextField
              fullWidth
              required
              id="phone"
              label="Телефон"
              value={userData.phone}
              onChange={handlePhoneChange}
              inputProps={{ maxLength: 10 }}
            />
          </div>
          <TextField
            id="additional-information"
            label="Допълнителна информация"
            multiline
            rows={3}
            sx={{ width: "100%" }}
            value={userData.additionalInformation}
            onChange={(e) =>
              setUserData({
                ...userData,
                additionalInformation: e.target.value,
              })
            }
          />
        </div>
        <Button
          variant="contained"
          id="confirm-purchase-button"
          onClick={confirmPurchase}
        >
          Потвърди поръчката
        </Button>
        {notification.message && (
          <div
            className={`notification-messages ${
              notification.type === "success"
                ? "success-messages"
                : "error-messages"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </Box>
  );
}
