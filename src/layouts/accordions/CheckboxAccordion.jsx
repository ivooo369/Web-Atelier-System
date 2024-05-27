/* eslint-disable react/prop-types */
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicCheckbox from "../others/Checkbox";

export default function CheckboxAccordion({
  title,
  id,
  expanded,
  handleExpansionChange,
  checkboxId,
  checkboxTitle,
  onSelect,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(!isChecked);
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
        <h3 className="panel-content-titles no-bottom-margin-titles">
          Опция за {title.toLowerCase()}
        </h3>
        {title === "Гръб" && (
          <p style={{ textAlign: "center" }}>
            (Изберете само когато рамката е със стъкло!)
          </p>
        )}
        <BasicCheckbox
          id={checkboxId}
          title={checkboxTitle}
          onChange={handleCheckboxChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
