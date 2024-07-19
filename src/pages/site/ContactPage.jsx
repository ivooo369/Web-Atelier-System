import "../../App.css";
import "../../styles/site/ContactPage.css";
import ContactForm from "../../components/ContactForm";
import handleFullScreen from "../../utils/handleFullScreen";

export default function ContactPage() {
  return (
    <div className="contacts-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">location_on</span>
        <h1>Контакти</h1>
      </header>
      <div className="contacts-page-container">
        <img
          src="./assets/images/google-maps-image.png"
          alt="Google Maps Image"
          className="google-maps-image"
          onClick={() =>
            handleFullScreen(document.querySelector(".google-maps-image"))
          }
        />
        <div
          className="contacts-information-container"
          style={{ display: "flex" }}
        >
          <div className="company-information" style={{ flex: 1 }}>
            <h2>БРИКС ООД</h2>
            <p className="address">
              Адрес: <span>ж.к. Хъшове, ул. „Борисова“ 49, 7012 Русе</span>
            </p>
            <div className="phone-numbers-container">
              <p className="phone-numbers">Телефонни контакти: </p>
              <p>
                Мобилен: <span>(+359) 887 887449</span>
              </p>
              <p>
                Стационарен: <span>(+359) 82 826725</span>
              </p>
            </div>
            <div className="work-time-container">
              <p className="work-time">Работно време: </p>
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
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
