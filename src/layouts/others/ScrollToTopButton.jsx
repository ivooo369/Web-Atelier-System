import "../../styles/ScrollToTopButton.css";
import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setIsVisible(currentScrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? "visible" : "hidden"}`}>
      <button className="scroll-button" onClick={scrollToTop}>
        <FaArrowCircleUp />
      </button>
    </div>
  );
}
