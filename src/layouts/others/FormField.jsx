/* eslint-disable react/prop-types */
import "../../styles/dashboard/ProductsDashboard.css";
import { TextField, Button, Box } from "@mui/material";
import BasicSelect from "./Select";

export default function FormField({
  label,
  field,
  type,
  menuItems,
  value = "",
  handleChange,
  fileInputRef,
  functionOfTheComponent,
}) {
  if (type === "select") {
    return (
      <BasicSelect
        label={label}
        labelId={`${field}-label`}
        menuItems={menuItems}
        value={value}
        handleChange={handleChange}
        fullWidth
      />
    );
  } else if (type === "textarea") {
    return (
      <TextField
        label={label}
        multiline
        rows={3}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      />
    );
  } else if (type === "file") {
    return (
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e.target.files[0])}
          style={{ display: "none" }}
          id="upload-button"
          ref={fileInputRef}
        />
        <label htmlFor="upload-button">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ textTransform: "none", height: "100%" }}
          >
            {functionOfTheComponent === "add"
              ? value && value.name
                ? value.name
                : "Качете изображение"
              : value
              ? typeof value === "string"
                ? value
                : value.name
              : "Качете изображение"}
          </Button>
        </label>
      </Box>
    );
  } else {
    return (
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      />
    );
  }
}
