import "../../styles/others/Layout.css";

export default function Footer() {
  return (
    <footer>
      © 2024 БРИКС ООД. Всички права запазени.
      <a
        href="https://www.facebook.com/briksbg/?locale=bg_BG"
        className="facebook-link"
      >
        <img
          src="/assets/images/facebook-icon.png"
          alt="Facebook Icon"
          className="facebook-icon"
        />
      </a>
    </footer>
  );
}
