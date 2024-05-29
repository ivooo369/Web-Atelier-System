/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

export default function MatboardsAccordion({
  title,
  id,
  expanded,
  handleExpansionChange,
  text,
  handleMatboardWidth,
  onSelectMatboardImage,
  onSelectMatboard,
  frameWidth,
  frameHeight,
  isInnerFrameSelected,
}) {
  const [matboards, setMatboards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMatboard, setActiveMatboard] = useState(null);
  const [matboardWidth, setMatboardWidth] = useState(1);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);
  const matboardsPerPage = 9;

  useEffect(() => {
    const fetchMatboards = async () => {
      try {
        const response = await axios.get(
          "https://website-project-lbpd.onrender.com/calculator",
          {
            params: { category: "Паспарту" },
          }
        );
        setMatboards(response.data);
      } catch (error) {
        console.error("Грешка при извличане на паспартутата:", error);
      }
    };

    fetchMatboards();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMatboardSelect = (matboard) => {
    if (activeMatboard === matboard.product_id) {
      onSelectMatboardImage("");
      onSelectMatboard("");
      setActiveMatboard(null);
      setMatboardWidth("");
    } else {
      onSelectMatboardImage(`/backend/${matboard.product_image_path}`);
      onSelectMatboard(matboard.product_name);
      setActiveMatboard(matboard.product_id);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleMatboardWidthChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value === "") {
      setMatboardWidth("");
    } else {
      value = Math.min(Math.max(parseInt(value), 1), 100);
      setMatboardWidth(value);
    }
  };

  const handleMatboardWidthBlur = () => {
    if (matboardWidth === "") {
      setMatboardWidth(1);
    }
  };

  const handleApplyMatboardWidth = () => {
    clearTimeout(timerRef.current);
    if (matboardWidth >= frameWidth || matboardWidth >= frameHeight) {
      setMessage(
        "Широчината на паспартуто не бива да надвишава широчината или височината на рамката!"
      );
      return;
    }
    handleMatboardWidth(matboardWidth);
    setMessage("Размерът е приложен успешно!");
    timerRef.current = setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const filteredMatboards = matboards.filter((matboard) => {
    return (
      (matboard.product_name &&
        matboard.product_name.toLowerCase().includes(searchTerm)) ||
      (matboard.product_category &&
        matboard.product_category.toLowerCase().includes(searchTerm))
    );
  });

  const indexOfLastMatboard = currentPage * matboardsPerPage;
  const indexOfFirstMatboard = indexOfLastMatboard - matboardsPerPage;
  const currentMatboards = filteredMatboards.slice(
    indexOfFirstMatboard,
    indexOfLastMatboard
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
        {activeMatboard && (
          <div className="matboard-width-input-container">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <FormHelperText id="outlined-width-helper-text">
                Широчина
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-width"
                value={matboardWidth}
                onChange={handleMatboardWidthChange}
                onBlur={handleMatboardWidthBlur}
                endAdornment={
                  <InputAdornment position="end">см</InputAdornment>
                }
                inputProps={{ "aria-label": "Широчина" }}
              />
            </FormControl>
            <Button
              variant="contained"
              id="apply-matboard-width-button"
              onClick={handleApplyMatboardWidth}
            >
              Приложи размер
            </Button>
          </div>
        )}
        {message && (
          <p
            className={`notification-messages ${
              message === "Размерът е приложен успешно!"
                ? "success-messages"
                : "error-messages"
            }`}
          >
            {message}
          </p>
        )}
        {currentMatboards.length > 0 ? (
          <>
            <div className="calculator-products-grid">
              {currentMatboards.map((matboard) => (
                <button
                  key={matboard.product_id}
                  disabled={
                    title === "Паспарту" && !isInnerFrameSelected ? true : false
                  }
                  className={`calculator-grid-items ${
                    activeMatboard === matboard.product_id ? "active" : ""
                  }`}
                  onClick={() => handleMatboardSelect(matboard)}
                >
                  <img
                    src={`/backend/${matboard.product_image_path}`}
                    alt={matboard.product_name}
                    className="calculator-products-images"
                  />
                  <h4
                    className="calculator-products-names"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {matboard.product_name}
                  </h4>
                  <p className="calculator-products-materials">
                    {matboard.product_material}
                  </p>
                </button>
              ))}
            </div>
            <Pagination
              count={Math.ceil(filteredMatboards.length / matboardsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              className="pagination"
              variant="outlined"
              shape="rounded"
            />
          </>
        ) : (
          <p className="no-products-message">Няма намерени паспартута!</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
