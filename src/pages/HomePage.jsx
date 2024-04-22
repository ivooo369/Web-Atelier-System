import "../styles/HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header className="atelier-information-area">
        <div className="phone-and-location-container">
          <span className="material-symbols-outlined">call</span>
          <div className="atelier-information-field">
            <p className="atelier-main-information">088 788 7449</p>
            <p>За поръчки и информация</p>
          </div>
        </div>
        <div className="phone-and-location-container">
          <span className="material-symbols-outlined">location_on</span>
          <div className="atelier-information-field">
            <p className="atelier-main-information">
              ж.к. Хъшове, ул. „Борисова“ 49, 7012 Русе
            </p>
            <p>Посетете ни място</p>
          </div>
        </div>
        <div className="phone-and-location-container">
          <span className="material-symbols-outlined">local_shipping</span>
          <div className="atelier-information-field">
            <p className="atelier-main-information">24 часа</p>
            <p>Експресни доставки</p>
          </div>
        </div>
      </header>
      <div className="products-information-area">
        <div className="products-buttons-grid">
          <Link
            className="product-custom-button"
            role="button"
            to="/products/frames"
          >
            <span className="material-symbols-outlined">photo_frame</span>
            <span className="text">Рамки</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/profiles"
          >
            <span className="material-symbols-outlined">photo_library</span>
            <span className="text">Профили</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/matboards"
          >
            <span className="material-symbols-outlined">draft</span>
            <span className="text">Паспарту</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/gobelins"
          >
            <span className="material-symbols-outlined">imagesmode</span>
            <span className="text">Гоблени</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/panels"
          >
            <span className="material-symbols-outlined">edit_document</span>
            <span className="text">Пана</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/mirrors"
          >
            <span className="material-symbols-outlined">capture</span>
            <span className="text">Огледала</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/icons"
          >
            <span className="material-symbols-outlined">church</span>
            <span className="text">Икони</span>
          </Link>
          <Link
            className="product-custom-button"
            role="button"
            to="/products/art-materials"
          >
            <span className="material-symbols-outlined">palette</span>
            <span className="text">Арт материали</span>
          </Link>
        </div>
        <div className="new-products-and-calculator-buttons-grid">
          <Link
            className="product-custom-button new-products-and-calculator-custom-buttons"
            role="button"
            to="/products/new-products"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text">Нови продукти</span>
          </Link>
          <Link
            className="product-custom-button new-products-and-calculator-custom-buttons"
            role="button"
            to="/calculator"
            target="_blank"
          >
            <span className="material-symbols-outlined">calculate</span>
            <span className="text">Калкулатор</span>
          </Link>
        </div>
      </div>
      <main>
        <h1 className="atelier-name">БРИКС ООД</h1>
        <p className="content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          sit fugiat fugit? Delectus facilis dolorem amet assumenda sed nesciunt
          aspernatur sunt culpa non tempore est, molestias nulla sequi corporis
          nam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          delectus ipsa minus iure ab blanditiis autem nesciunt? Ex quia
          assumenda non sequi perspiciatis quas, natus maiores? Id nulla veniam
          eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dignissimos sit fugiat fugit? Delectus facilis dolorem amet assumenda
          sed nesciunt aspernatur sunt culpa non tempore est, molestias nulla
          sequi corporis nam? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam delectus ipsa minus iure ab blanditiis autem nesciunt?
          Ex quia assumenda non sequi perspiciatis quas, natus maiores? Id nulla
          veniam eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dignissimos sit fugiat fugit? Delectus facilis dolorem amet
          assumenda sed nesciunt aspernatur sunt culpa non tempore est,
          molestias nulla sequi corporis nam? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam delectus ipsa minus iure ab
          blanditiis autem nesciunt? Ex quia assumenda non sequi perspiciatis
          quas, natus maiores? Id nulla veniam eveniet! Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Dignissimos sit fugiat fugit?
          Delectus facilis dolorem amet assumenda sed nesciunt aspernatur sunt
          culpa non tempore est, molestias nulla sequi corporis nam? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quisquam delectus ipsa
          minus iure ab blanditiis autem nesciunt? Ex quia assumenda non sequi
          perspiciatis quas, natus maiores? Id nulla veniam eveniet! Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Dignissimos sit fugiat
          fugit? Delectus facilis dolorem amet assumenda sed nesciunt aspernatur
          sunt culpa non tempore est, molestias nulla sequi corporis nam? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam delectus
          ipsa minus iure ab blanditiis autem nesciunt? Ex quia assumenda non
          sequi perspiciatis quas, natus maiores? Id nulla veniam eveniet! Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos sit
          fugiat fugit? Delectus facilis dolorem amet assumenda sed nesciunt
          aspernatur sunt culpa non tempore est, molestias nulla sequi corporis
          nam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          delectus ipsa minus iure ab blanditiis autem nesciunt? Ex quia
          assumenda non sequi perspiciatis quas, natus maiores? Id nulla veniam
          eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dignissimos sit fugiat fugit? Delectus facilis dolorem amet assumenda
          sed nesciunt aspernatur sunt culpa non tempore est, molestias nulla
          sequi corporis nam? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam delectus ipsa minus iure ab blanditiis autem nesciunt?
          Ex quia assumenda non sequi perspiciatis quas, natus maiores? Id nulla
          veniam eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dignissimos sit fugiat fugit? Delectus facilis dolorem amet
          assumenda sed nesciunt aspernatur sunt culpa non tempore est,
          molestias nulla sequi corporis nam? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam delectus ipsa minus iure ab
          blanditiis autem nesciunt? Ex quia assumenda non sequi perspiciatis
          quas, natus maiores? Id nulla veniam eveniet!
        </p>
      </main>
    </>
  );
}
