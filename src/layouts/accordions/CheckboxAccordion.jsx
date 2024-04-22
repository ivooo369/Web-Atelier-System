/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicCheckbox from "../others/Checkbox";

export default function CheckboxAccordion({
  title,
  id,
  expanded,
  handleChange,
  checkboxId,
  checkboxTitle,
}) {
  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
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
        <BasicCheckbox id={checkboxId} title={checkboxTitle} />
      </AccordionDetails>
    </Accordion>
  );
}
