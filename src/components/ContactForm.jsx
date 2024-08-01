import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(null);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    let timeout;
    if (notification) {
      timeout = setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      setNotification("Невалиден формат на имейл адреса!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/contacts`, {
        name,
        email,
        topic,
        message,
      });
      setName("");
      setEmail("");
      setTopic("");
      setMessage("");
      setNotification("Вашето съобщение е изпратено успешно!");
    } catch (error) {
      console.error("Грешка при изпращане на съобщението:", error);
    }
  };

  const handleInputChange = (setter, value, maxLength) => {
    if (value.length <= maxLength) {
      setter(value);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    handleInputChange(setEmail, newEmail, 255);
    setEmailError(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Форма за контакти</h2>
      <div className="inputs-container">
        <div className="contact-form-inputs">
          <div className="name-and-email-inputs">
            <TextField
              fullWidth
              required
              id="name-input"
              label="Име"
              value={name}
              onChange={(e) => handleInputChange(setName, e.target.value, 255)}
            />
            <TextField
              fullWidth
              required
              id="email-input"
              label="E-mail"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              InputProps={{
                type: "email",
              }}
            />
          </div>
          <TextField
            fullWidth
            required
            id="topic-input"
            label="Тема"
            value={topic}
            onChange={(e) => handleInputChange(setTopic, e.target.value, 255)}
          />
          <TextField
            required
            id="message-input"
            label="Съобщение"
            multiline
            rows={3}
            sx={{ width: "100%" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <Button variant="contained" id="send-message-button" type="submit">
        Изпрати съобщение
      </Button>
      {notification && (
        <div
          className={`notification-messages ${
            notification !== "Вашето съобщение е изпратено успешно!"
              ? "error-messages"
              : "success-messages"
          }`}
        >
          {notification}
        </div>
      )}
    </form>
  );
}
