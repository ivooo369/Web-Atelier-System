import "../styles/Contacts.css";
import "../layouts/ContactForm";
import ContactForm from "../layouts/ContactForm";

export default function Contacts() {
  return (
    <div className="contacts-container">
      <header className="contacts-header">
        <span className="material-symbols-outlined">location_on</span>
        <h1>Контакти</h1>
      </header>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.664540324601!2d25.952323976654434!3d43.842053140195155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ae61f62eb25abb%3A0xdf9889386fa2171f!2z0JHRgNC40LrRgQ!5e0!3m2!1sbg!2sbg!4v1708361216627!5m2!1sbg!2sbg"
        width="75%"
        height="250"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div
        className="contacts-information-container"
        style={{ display: "flex" }}
      >
        <div className="company-information" style={{ flex: 1 }}>
          <h2>БРИКС ООД</h2>
          <p>
            Адрес: <span>ж.к. Хъшове, ул. „Борисова“ 49, 7012 Русе</span>
          </p>
          <div className="phone-numbers">
            <p>Телефонни контакти: </p>
            <hr />
            <p>
              Мобилен: <span>(+359) 887 887449</span>
            </p>
            <p>
              Стационарен: <span>(+359) 82 826725</span>
            </p>
          </div>
          <div className="work-time">
            <p>Работно време: </p>
            <hr />
            <p>
              Понеделник - Петък: <span>9:30 ч. - 18:30 ч.</span>
            </p>
            <p>
              Събота: <span>10:00 ч. - 14:00 ч.</span>
            </p>
            <p>
              Неделя: <span>Почивен ден</span>
            </p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
