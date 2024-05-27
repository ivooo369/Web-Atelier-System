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

export default function SignInPage() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigateTo = useNavigate();

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerEmail, customerPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("customerAuthToken", data.token);
      localStorage.setItem("customerEmail", customerEmail);
      setSuccessMessage("Успешно влизане в акаунта!");
      setErrorMessage("");
      setTimeout(() => {
        navigateTo("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Грешка при влизане в акаунта!", error.message);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="sign-in-page-container">
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <h2>Влизане в акаунт</h2>
        <div className="inputs-container">
          <div className="sign-in-inputs">
            <TextField
              fullWidth
              required
              id="email-input"
              label="E-mail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-password-input">Парола</InputLabel>
              <OutlinedInput
                id="outlined-password-input"
                type={showPassword ? "text" : "password"}
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
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
          </div>
        </div>
        <Button type="submit" variant="contained" id="sign-in-button">
          Вход
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
