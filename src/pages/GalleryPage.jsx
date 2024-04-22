import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/GalleryPage.css";

export default function GalleryPage() {
  const imageNumbers = Array.from({ length: 16 }, (_, index) => index + 1);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageNumber) => {
    setSelectedImage(imageNumber);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === imageNumbers.length) {
      setSelectedImage(1);
    } else {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage === 1) {
      setSelectedImage(imageNumbers.length);
    } else {
      setSelectedImage(selectedImage - 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.classList.contains("modal-overlay") ||
        event.target.classList.contains("arrow-buttons")
      ) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="page-header">
        <span className="material-symbols-outlined">photo_library</span>
        <h1>Галерия</h1>
      </header>
      <div className="atelier-images-grid">
        {imageNumbers.map((number) => (
          <img
            key={number}
            className="atelier-images"
            src={`assets/images/image-${number}.jpg`}
            alt={`Image-${number}`}
            onClick={() => openModal(number)}
          />
        ))}
      </div>
      {selectedImage && (
        <>
          <div className="arrow-buttons">
            <button className="arrow-button prev-button" onClick={prevImage}>
              {"<"}
            </button>
            <button className="arrow-button next-button" onClick={nextImage}>
              {">"}
            </button>
          </div>
          <div className="modal-overlay">
            <div className="modal">
              <img
                className="modal-image"
                src={`assets/images/image-${selectedImage}.jpg`}
                alt={`Image-${selectedImage}`}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
