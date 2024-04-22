/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Matboard from "../../components/Matboard";
import SearchBar from "../others/SearchBar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

export default function MatboardsAccordion({ expanded, handleChange }) {
  return (
    <>
      <Accordion
        expanded={expanded === "matboard"}
        onChange={handleChange("matboard")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="matboard-content"
          className="accordion-headers"
        >
          <p className="accordion-titles">Паспарту</p>
        </AccordionSummary>
        <AccordionDetails>
          <h3 className="panel-content-titles">
            Хартиеното паспарту се поставя между картината и рамка №1
          </h3>
          <SearchBar />
          <div className="matboard-width-container">
            <OutlinedInput
              id="outlined-adornment-height"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="outlined-height-helper-text"
              inputProps={{ "aria-label": "Височина" }}
            />
            <Button
              variant="contained"
              className="link-buttons"
              id="apply-matboard-width-button"
            >
              Приложи размер
            </Button>
          </div>
          <div className="matboards-grid">
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
            <Matboard />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
