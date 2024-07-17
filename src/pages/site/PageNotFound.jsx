import "../../styles/site/PageNotFound.css";
import { Link } from "react-router-dom";

export default function PageNotFount() {
  return (
    <div className="page-not-found-container pages">
      <div className="page-not-found-content">
        <span className="material-symbols-outlined">warning</span>
        <div className="page-not-found-text">
          <h1 className="page-not-found-title">
            404 - Страницата не е намерена.
          </h1>
          <h2>
            Моля, върнете се към нашата{" "}
            <Link to="/" className="back-to-home-page-link">
              начална страница
            </Link>
            !
          </h2>
        </div>
      </div>
    </div>
  );
}
