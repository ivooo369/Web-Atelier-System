import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/dashboard/MessagesDashboard.css";

export default function MessagesDashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://website-project-lbpd.onrender.com/admin/dashboard/messages"
        );
        const formattedMessages = response.data.map((message) => ({
          ...message,
          message_submission_date: formatMessageDate(
            message.message_submission_date
          ),
        }));

        setMessages(formattedMessages.reverse());
      } catch (error) {
        console.error("Грешка при извличане на съобщенията:", error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {}, []);

  const formatMessageDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}.${month}.${year} г. (${hours}:${minutes} ч.)`;
    return formattedDate;
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `https://website-project-lbpd.onrender.com/admin/dashboard/messages/${messageId}`
      );
      setMessages(
        messages.filter((message) => message.message_id !== messageId)
      );
    } catch (error) {
      console.error("Грешка при изтриване на съобщението:", error);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Съобщения</h1>
      </div>
      <div className="messages-container">
        {messages.length === 0 ? (
          <p className="no-messages">Няма получени съобщения.</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.message_id} className="message-item">
                <div className="message-details">
                  <span className="detail-label">Име:</span>{" "}
                  <span className="detail-value">
                    {message.message_customer_name}
                  </span>
                </div>
                <div className="message-details">
                  <span className="detail-label">Имейл:</span>{" "}
                  <span className="detail-value">
                    {message.message_customer_email}
                  </span>
                </div>
                <div className="message-details">
                  <span className="detail-label">Тема:</span>{" "}
                  <span className="detail-value">{message.message_title}</span>
                </div>
                <div className="message-details">
                  <span className="detail-label">Съдържание:</span>{" "}
                  <span className="detail-value">
                    {message.message_content}
                  </span>
                </div>
                <div className="message-details">
                  <span className="detail-label">Дата:</span>{" "}
                  <span className="detail-value">
                    {message.message_submission_date}
                  </span>
                </div>
                <div className="delete-message-button-container">
                  <button
                    className="delete-message-button"
                    onClick={() => handleDeleteMessage(message.message_id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                    Изтрий съобщението
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
