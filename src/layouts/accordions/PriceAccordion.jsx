/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PriceAccordion({ expanded, handleChange }) {
  return (
    <Accordion expanded={expanded === "price"} onChange={handleChange("price")}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="price-content"
        className="accordion-headers"
      >
        <p className="accordion-titles">Цена</p>
      </AccordionSummary>
      <AccordionDetails>
        <h3 className="panel-content-titles">Крайна цена</h3>
        <div className="details-container-grid">
          <p>
            Рамка №1: <b>H103</b>
          </p>
          <p>
            Рамка №2: <b>H103</b>
          </p>
          <p>
            Ширина: <b>24</b>
          </p>
          <p>
            Височина: <b>18</b>
          </p>
          <p>
            Паспарту: <b>H103</b>
          </p>
          <p>
            Подрамка: <b>не</b>
          </p>
          <p>
            Опъване на гоблен: <b>не</b>
          </p>
          <p>
            Стъкло: <b>не</b>
          </p>
          <p>
            Огледало: <b>не</b>
          </p>
          <p>
            Гръб: <b>не</b>
          </p>
          <p>
            Окачване: <b>не</b>
          </p>
          <p>
            Брой рамки: <b>1</b>
          </p>
          <p>
            Единична цена: <b>10.00 лв.</b>
          </p>
          <p className="total-price-text">
            <b>Крайна цена: </b>
            <b className="total-price-value">10.00 лв.</b>
          </p>
        </div>
        <Button variant="contained" id="add-to-cart-button">
          Добави в количка
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
