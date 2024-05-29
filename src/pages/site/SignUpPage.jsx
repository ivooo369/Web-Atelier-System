import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SignUpPage() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPassword: "",
    customerConfirmPassword: "",
    customerCity: "",
    customerAddress: "",
    customerPhone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    if (/^\d*$/.test(phone) && phone.length <= 10) {
      setFormData({ ...formData, customerPhone: phone });
    }
  };

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      setErrorMessage("Моля, въведете валиден имейл адрес!");
      return false;
    }

    if (formData.customerPassword.length < 8) {
      setErrorMessage("Паролата трябва да бъде поне 8 символа!");
      return false;
    }

    if (formData.customerPassword !== formData.customerConfirmPassword) {
      setErrorMessage("Паролите не съвпадат!");
      return false;
    }

    if (
      formData.customerPhone.length !== 10 ||
      !/^\d+$/.test(formData.customerPhone)
    ) {
      setErrorMessage("Телефонът трябва да съдържа точно 10 цифри!");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    let errorTimeout;
    let successTimeout;

    if (errorMessage) {
      errorTimeout = setTimeout(() => setErrorMessage(""), 3000);
    }

    if (successMessage) {
      successTimeout = setTimeout(() => setSuccessMessage(""), 3000);
    }

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [errorMessage, successMessage]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "https://website-project-lbpd.onrender.com/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("customerAuthToken", data.token);
      localStorage.setItem("customerEmail", formData.customerEmail);

      setSuccessMessage("Регистрацията е успешна!");
      setErrorMessage("");

      setTimeout(() => {
        navigateTo("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "Грешка при регистрацията!");
      console.error("Грешка при регистрация:", error);
    }
  };

  return (
    <div className="sign-up-page-container">
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <h2>Създаване на нов акаунт</h2>
        <div className="inputs-container">
          <div className="sign-up-inputs">
            <TextField
              required
              id="name-input"
              label="Име"
              onChange={(e) => handleChange("customerName", e.target.value)}
            />
            <TextField
              required
              id="email-input"
              label="E-mail"
              onChange={(e) => handleChange("customerEmail", e.target.value)}
            />
            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-password-input">Парола</InputLabel>
              <OutlinedInput
                id="outlined-password-input"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  handleChange("customerPassword", e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        backgroundColor: "darkgrey",
                        marginRight: "1px",
                        "&:hover": {
                          backgroundColor: "grey",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Парола"
              />
            </FormControl>
            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-confirm-password-input">
                Потвърдете паролата
              </InputLabel>
              <OutlinedInput
                id="outlined-confirm-password-input"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  handleChange("customerConfirmPassword", e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        backgroundColor: "darkgrey",
                        marginRight: "1px",
                        "&:hover": {
                          backgroundColor: "grey",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Потвърдете паролата"
              />
            </FormControl>
            <TextField
              id="city-input"
              label="Град"
              onChange={(e) => handleChange("customerCity", e.target.value)}
            />
            <TextField
              id="address-input"
              label="Адрес"
              onChange={(e) => handleChange("customerAddress", e.target.value)}
            />
            <TextField
              id="phone-input"
              label="Телефон"
              value={formData.customerPhone}
              onChange={handlePhoneChange}
              inputProps={{ maxLength: 10 }}
            />
          </div>
        </div>
        <Button type="submit" variant="contained" id="sign-up-button">
          Регистрация
        </Button>
        {errorMessage && (
          <div className="notification-messages error-messages">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="notification-messages success-messages">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}
