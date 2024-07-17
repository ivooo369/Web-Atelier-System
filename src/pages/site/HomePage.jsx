import "../../styles/site/HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="pages">
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
          >
            <span className="material-symbols-outlined">calculate</span>
            <span className="text">Калкулатор</span>
          </Link>
        </div>
      </div>
      <main>
        <h1 className="atelier-name">БРИКС ООД</h1>
        <div className="content">
          <p>
            &emsp;Добре дошли в ателие <span>&quot;БРИКС ООД&quot;</span>! Ние
            сме вашето място за разнообразни и качествени продукти за декорация
            и изкуство. Тук ще откриете богато разнообразие от артикули,
            подходящи за всеки вкус и стил. Нашата мисия е да предложим на
            клиентите си не само красиви и функционални продукти, но и
            персонализирано обслужване, което да ги удовлетвори напълно.
          </p>
          <p>
            Изпълнете вашите декоративни и творчески идеи с нашите уникални
            артикули:
          </p>
          <ul>
            <li>
              <b>Рамки:</b> Подберете от нашите елегантни и разнообразни рамки
              за картини, гоблени и снимки, които ще подчертаят вашите специални
              моменти и творчески проекти.
            </li>
            <li>
              <b>Профили:</b> Разгледайте нашата колекция от изискани профили за
              подрамки, мебели и интериор, които ще добавят изтънченост и стил
              на вашите проекти.
            </li>
            <li>
              <b>Паспарту:</b> Открийте разнообразие от паспарту в различни
              цветове и размери, които да допълнят и подчертаят вашите творби.
            </li>
            <li>
              <b>Гоблени:</b> Потопете се във вълнуващия свят на гоблените с
              нашата широка гама от дизайни, готови да ви впечатлят с красотата
              и детайлите си.
            </li>
            <li>
              <b>Пана с приложни материали:</b> Разгледайте нашите пана и
              богатата селекция от приложни материали, които да ви помогнат да
              създадете уникални и изразителни проекти.
            </li>
            <li>
              <b>Огледала:</b> Изберете от нашите стилни и функционални
              огледала, които да добавят светлина, пространство и елегантност
              във вашия дом или офис.
            </li>
            <li>
              <b>Икони:</b> Открийте нашата колекция от ръчно изработени икони,
              вдъхновени от българската традиция и култура, които да внесат
              духовност и хармония във вашия живот.
            </li>
            <li>
              <b>Арт материали:</b> Изразете вашата креативност с нашите
              висококачествени арт материали - бои, пaнели, хартии, четки и
              много други, които да ви помогнат да създадете великолепни
              произведения на изкуството.
            </li>
          </ul>
          <p>
            &emsp;Нашият екип от професионалисти е тук, за да ви помогне със
            съвети, вдъхновение и най-доброто обслужване. Заповядайте в нашето
            ателие и създайте нещо уникално с продуктите на{" "}
            <span>&quot;БРИКС ООД&quot;</span>!
          </p>
        </div>
      </main>
    </div>
  );
}
