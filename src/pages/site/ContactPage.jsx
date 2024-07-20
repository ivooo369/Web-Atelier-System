import "../../App.css";
import "../../styles/site/ContactPage.css";
import ContactForm from "../../components/ContactForm";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function ContactPage() {
  const centerCoordinates = [43.8419, 25.9547];

  return (
    <div className="contacts-container pages">
      <header className="page-header">
        <span className="material-symbols-outlined">location_on</span>
        <h1>Контакти</h1>
      </header>
      <div className="contacts-page-container">
        <div className="map-container">
          <MapContainer
            center={centerCoordinates}
            zoom={15}
            style={{ height: "100%", width: "100%", border: "3px double" }}
          >
            <TileLayer
              url={
                "https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=2qSkbNugJZHFID6tuGdb"
              }
              attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> contributors'
            />
            <Marker position={centerCoordinates}>
              <Popup>Atelier Briks, Ruse</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="contacts-information-container">
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
