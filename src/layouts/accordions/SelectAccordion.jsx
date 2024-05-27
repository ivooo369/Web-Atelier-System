/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicSelect from "../others/SelectHangingOptions";

export default function SelectAccordion({
  title,
  id,
  expanded,
  handleExpansionChange,
  selectLabel,
  selectMenuItems,
  selectValue,
  selectOnChange,
}) {
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
        <div className="hanging-examples">
          <div className="hanging-example">
            Вертикално - <div className="vertical-hanging"></div>
          </div>
          <div className="hanging-example">
            Хоризонтално - <div className="horizontal-hanging"></div>
          </div>
        </div>
        <div className="input-container">
          <>
            <BasicSelect
              label={selectLabel}
              menuItems={selectMenuItems}
              value={selectValue || "не"}
              handleChange={selectOnChange}
              fullWidth
            />
          </>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
