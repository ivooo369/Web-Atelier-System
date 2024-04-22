/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

export default function SizesAccordion({ expanded, handleChange }) {
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="sizes-content"
        className="accordion-headers"
      >
        <p className="accordion-titles">Размери</p>
      </AccordionSummary>
      <AccordionDetails>
        <h3 className="panel-content-titles no-bottom-margin-titles">
          Изберете широчина и височина за вашата картина, гоблен, огледало или
          икона:
        </h3>
        <div className="width-and-height-inputs">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <FormHelperText id="outlined-width-helper-text">
              Широчина
            </FormHelperText>
            <OutlinedInput
              id="outlined-adornment-width"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="outlined-width-helper-text"
              inputProps={{ "aria-label": "Широчина" }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <FormHelperText id="outlined-height-helper-text">
              Височина
            </FormHelperText>
            <OutlinedInput
              id="outlined-adornment-height"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="outlined-height-helper-text"
              inputProps={{ "aria-label": "Височина" }}
            />
          </FormControl>
        </div>
        <div className="buttons-container">
          <Button variant="contained" id="apply-frame-sizes-button">
            Приложи размери
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
