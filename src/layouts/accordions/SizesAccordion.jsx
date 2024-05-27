/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

export default function SizesAccordion({
  expanded,
  handleExpansionChange,
  handleFrameSizes,
}) {
  const [frameWidth, setFrameWidth] = useState(15);
  const [frameHeight, setFrameHeight] = useState(10);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);

  const handleFrameWidthChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value === "") {
      setFrameWidth("");
    } else {
      value = Math.min(Math.max(parseInt(value), 1), 300);
      setFrameWidth(value);
    }
  };

  const handleFrameHeightChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value === "") {
      setFrameHeight("");
    } else {
      value = Math.min(Math.max(parseInt(value), 1), 300);
      setFrameHeight(value);
    }
  };

  const handleFrameWidthBlur = () => {
    if (frameWidth === "") {
      setFrameWidth(1);
    }
  };

  const handleFrameHeightBlur = () => {
    if (frameHeight === "") {
      setFrameHeight(1);
    }
  };

  const handleApplyFrameSizes = () => {
    clearTimeout(timerRef.current);
    handleFrameSizes(frameWidth, frameHeight);
    setMessage("Размерите са приложени успешно!");
    timerRef.current = setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpansionChange}>
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
        <p className="sizes-info">Максимален размер: 300 см x 300 см</p>
        <div className="width-and-height-inputs">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <FormHelperText id="outlined-width-helper-text">
              Широчина
            </FormHelperText>
            <OutlinedInput
              id="outlined-adornment-width"
              value={frameWidth}
              onChange={handleFrameWidthChange}
              onBlur={handleFrameWidthBlur}
              endAdornment={<InputAdornment position="end">см</InputAdornment>}
              inputProps={{ "aria-label": "Широчина" }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <FormHelperText id="outlined-height-helper-text">
              Височина
            </FormHelperText>
            <OutlinedInput
              id="outlined-adornment-height"
              value={frameHeight}
              onChange={handleFrameHeightChange}
              onBlur={handleFrameHeightBlur}
              endAdornment={<InputAdornment position="end">см</InputAdornment>}
              inputProps={{ "aria-label": "Височина" }}
            />
          </FormControl>
        </div>
        <div className="buttons-container">
          <Button
            variant="contained"
            id="apply-frame-sizes-button"
            onClick={handleApplyFrameSizes}
          >
            Приложи размери
          </Button>
        </div>
        {message && (
          <p className="notification-messages success-messages">{message}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
