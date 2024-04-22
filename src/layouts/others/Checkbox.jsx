/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox";
import "../../styles/CalculatorPage.css";

const label = { inputProps: { "aria-label": "Checkbox" } };

export default function BasicCheckbox({ id, title }) {
  return (
    <div className="checkbox-container">
      <Checkbox
        {...label}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "black" } }}
        id={id}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
