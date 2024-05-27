import "../../styles/others/Layout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(2),
  },
  "& button": {
    justifyContent: "end",
    color: "white",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1rem",
    transition: theme.transitions.create("width"),
  },
}));

export default function HeaderSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigateTo = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      navigateTo(`/products/search?name=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="search-bar">
      <Search
        sx={{
          "@media (max-width: 390px)": {
            width: 200,
          },
          "@media (min-width: 390px) and (max-width: 580px)": {
            width: 300,
            height: 1,
            marginLeft: 0,
          },
        }}
      >
        <StyledInputBase
          placeholder="Търси…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <SearchIcon className="search-icon" style={{ color: "white" }} />
        </Button>
      </Search>
    </div>
  );
}
