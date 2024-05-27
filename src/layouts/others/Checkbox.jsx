/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox";
import "../../styles/calculator/CalculatorPage.css";

const label = { inputProps: { "aria-label": "Checkbox" } };

export default function BasicCheckbox({ id, title, onChange }) {
  const handleChange = (е) => {
    if (onChange) {
      onChange(е.target.checked);
    }
  };

  return (
    <div className="checkbox-container">
      <Checkbox
        {...label}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28, color: "black" } }}
        id={id}
        onChange={handleChange}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
