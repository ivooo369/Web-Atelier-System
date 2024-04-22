import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ContactForm() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1, mx: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="purchase-form">
        <div className="inputs-container">
          <div className="purchase-inputs">
            <TextField fullWidth required id="name-input" label="Име" />
            <TextField fullWidth required id="city-input" label="Град" />
            <TextField fullWidth required id="address-input" label="Адрес" />
            <TextField fullWidth required id="email-input" label="E-mail" />
            <TextField fullWidth required id="phone-input" label="Телефон" />
          </div>
          <TextField
            id="additional-information-input"
            label="Допълнителна информация"
            multiline
            rows={3}
            sx={{ width: "100%" }}
          />
        </div>
      </div>
    </Box>
  );
}
