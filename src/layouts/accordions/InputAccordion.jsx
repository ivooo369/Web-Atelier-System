/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function InputAccordion({
  title,
  id,
  expanded,
  handleExpansionChange,
  handleNumberOfFramesInput,
}) {
  const [numberOfFrames, setNumberOfFrames] = useState(1);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);

  const handleNumberOfFramesChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value === "") {
      setNumberOfFrames("");
    } else {
      value = Math.min(Math.max(parseInt(value), 1), 99999);
      setNumberOfFrames(value);
    }
  };

  const handleNumberOfFramesBlur = () => {
    if (numberOfFrames === "") {
      setNumberOfFrames(1);
    }
  };

  const handleApplyNumberOfFrames = () => {
    clearTimeout(timerRef.current);
    handleNumberOfFramesInput(numberOfFrames);
    setMessage("Броят на рамките е приложен успешно!");
    timerRef.current = setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <Accordion expanded={expanded === id} onChange={handleExpansionChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        className="accordion-headers"
      >
        <p className="accordion-titles">{title}</p>
      </AccordionSummary>
      <AccordionDetails>
        <h3 className="panel-content-titles">{title}</h3>
        <div className="input-container">
          <>
            <OutlinedInput
              id="outlined-adornment-frames"
              value={numberOfFrames}
              onChange={handleNumberOfFramesChange}
              onBlur={handleNumberOfFramesBlur}
              inputProps={{ "aria-label": "Брой рамки" }}
            />
            <Button
              variant="contained"
              id="number-of-frames-button"
              onClick={handleApplyNumberOfFrames}
            >
              Приложи броя
            </Button>
          </>
        </div>
        {message && (
          <p className="notification-messages success-messages">{message}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
