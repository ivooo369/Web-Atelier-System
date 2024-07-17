/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function FramesAccordion({
  title,
  id,
  expanded,
  handleExpansionChange,
  text,
  onSelectFrameImage,
  framesCategory,
  onSelectFrame,
  isInnerFrameSelected,
}) {
  const [frames, setFrames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFrame, setActiveFrame] = useState(null);
  const framesPerPage = 9;

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/calculator`, {
          params: { category: "Рамки" },
        });
        setFrames(response.data);
      } catch (error) {
        console.error("Грешка при извличане на рамките:", error);
      }
    };

    fetchFrames();
  }, [framesCategory]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFrameSelect = (frame) => {
    if (title === "Външна рамка") {
      if (activeFrame === frame.product_id) {
        onSelectFrameImage("");
        onSelectFrame("");
        setActiveFrame(null);
      } else {
        onSelectFrameImage(`/${frame.product_image_path}`);
        onSelectFrame(frame.product_name);
        setActiveFrame(frame.product_id);
      }
    } else {
      onSelectFrameImage(`/${frame.product_image_path}`);
      onSelectFrame(frame.product_name);
      setActiveFrame(frame.product_id);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const filteredFrames = frames.filter((frame) => {
    return (
      frame.product_category === framesCategory &&
      ((frame.product_name &&
        frame.product_name.toLowerCase().includes(searchTerm)) ||
        (frame.product_category &&
          frame.product_category.toLowerCase().includes(searchTerm)))
    );
  });

  const indexOfLastFrame = currentPage * framesPerPage;
  const indexOfFirstFrame = indexOfLastFrame - framesPerPage;
  const currentFrames = filteredFrames.slice(
    indexOfFirstFrame,
    indexOfLastFrame
  );

  return (
    <Accordion expanded={expanded === id} onChange={handleExpansionChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        className="accordion-headers"
      >
        <p className="accordion-titles">{title}</p>
      </AccordionSummary>
      <AccordionDetails className="width-and-height-container">
        <h3 className="panel-content-titles">{text}</h3>
        <input
          type="text"
          className="dashboard-and-calculator-search-inputs"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Търсене..."
        />
        {currentFrames.length > 0 ? (
          <>
            <div className="calculator-products-grid">
              {currentFrames.map((frame) => (
                <button
                  disabled={
                    title === "Външна рамка" && !isInnerFrameSelected
                      ? true
                      : false
                  }
                  key={frame.product_id}
                  className={`calculator-grid-items ${
                    activeFrame === frame.product_id ? "active" : ""
                  }`}
                  onClick={() => handleFrameSelect(frame)}
                >
                  <img
                    src={`/${frame.product_image_path}`}
                    alt={frame.product_name}
                    className="calculator-products-images"
                  />
                  <h4
                    className="calculator-products-names"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {frame.product_name}
                  </h4>
                  <p className="calculator-products-materials">
                    {frame.product_material}
                  </p>
                </button>
              ))}
            </div>
            <Pagination
              count={Math.ceil(filteredFrames.length / framesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              className="pagination"
              variant="outlined"
              shape="rounded"
            />
          </>
        ) : (
          <p className="no-products-message">Няма намерени рамки!</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
