/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchBar from "../others/SearchBar";
import Frame from "../../components/Frame";

export default function FramesAccordion({
  title,
  id,
  expanded,
  handleChange,
  text,
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
      <AccordionDetails className="width-and-height-container">
        <h3 className="panel-content-titles">{text}</h3>
        <SearchBar />
        <div className="frames-grid">
          <Frame />
          <Frame />
          <Frame />
          <Frame />
          <Frame />
          <Frame />
          <Frame />
          <Frame />
          <Frame />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
