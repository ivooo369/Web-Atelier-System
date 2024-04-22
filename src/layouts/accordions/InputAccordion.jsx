/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicSelect from "../others/Select";

export default function InputAccordion({
  title,
  id,
  expanded,
  handleChange,
  selectLabel,
  selectMenuItems,
  selectValue,
  selectOnChange,
  showSelect,
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
        <h3 className="panel-content-titles">{title}</h3>
        <div className="input-container">
          {showSelect ? (
            <BasicSelect
              label={selectLabel}
              menuItems={selectMenuItems}
              value={selectValue}
              handleChange={selectOnChange}
            />
          ) : (
            <input
              type="number"
              className="number-of-frames-input"
              placeholder="Въведете броя на рамките"
              min={1}
              onChange={(e) => console.log(e.target.value)}
            />
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
