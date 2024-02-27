import "../styles/Header.css";
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import Hidden from "@mui/material/Hidden";

const BrandText = "Ателие БРИКС";
const pages = ["Начало", "Продукти", "Галерия", "Контакти"];
const pageRoutes = ["/", "/products", "/gallery", "/contacts"];
const productsMenuItems = [
  "Нови продукти",
  "Рамки",
  "Профили",
  "Паспарту",
  "Гоблини",
  "Пана",
  "Огледала",
  "Икони",
  "Арт материали",
];
const productsMenuIcons = [
  "grid_view",
  "photo_frame",
  "photo_library",
  "draft",
  "imagesmode",
  "edit_document",
  "capture",
  "church",
  "palette",
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#524d4d",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(60deg, #29323c 0%, #485563 100%);",
          backgroundBlendMode: "multiply, multiply",
        },
      },
    },
  },
});

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
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(2),
  },
  "& button": {
    justifyContent: "end",
    paddingRight: "1rem",
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
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
    },
  },
}));

export default function Header() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [productsMenuAnchorEl, setProductsMenuAnchorEl] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setProductsMenuAnchorEl(null);
  };

  const handleProductsButtonClick = (event) => {
    setProductsMenuAnchorEl(event.currentTarget);
  };

  const handleProductsMenuClose = () => {
    setProductsMenuAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(screenWidth);
      if (screenWidth > 900) {
        handleMenuClose();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (
        productsMenuAnchorEl &&
        !productsMenuAnchorEl.contains(event.target)
      ) {
        setProductsMenuAnchorEl(null);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [productsMenuAnchorEl]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 900,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {BrandText}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Hidden mdDown>
              {pages.map((page, index) => (
                <Fragment key={page}>
                  {page === "Продукти" ? (
                    <Button
                      color="inherit"
                      sx={{
                        fontWeight: 700,
                        ...(page === "Продукти" && {
                          transition: "none",
                        }),
                      }}
                      aria-controls="products-menu"
                      aria-haspopup="true"
                      onClick={handleProductsButtonClick}
                    >
                      {page}
                      <Menu
                        id="products-menu"
                        anchorEl={productsMenuAnchorEl}
                        open={Boolean(productsMenuAnchorEl)}
                        onClose={handleProductsMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {productsMenuItems.map((product, index) => (
                          <Link key={product} className="products-menu-links">
                            <span className="material-symbols-outlined">
                              {productsMenuIcons[index]}
                            </span>
                            <MenuItem
                              onClick={() => setProductsMenuAnchorEl(null)}
                              sx={{ fontWeight: 700 }}
                            >
                              {product}
                            </MenuItem>
                          </Link>
                        ))}
                      </Menu>
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={pageRoutes[index]}
                      color="inherit"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {page}
                    </Button>
                  )}
                </Fragment>
              ))}
            </Hidden>

            <Search sx={{ marginLeft: 3 }}>
              <StyledInputBase
                placeholder="Търси…"
                inputProps={{ "aria-label": "search" }}
              />
              <Button>
                <SearchIcon />
              </Button>
            </Search>

            <Hidden mdUp>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Menu
              open={Boolean(menuAnchorEl)}
              anchorEl={menuAnchorEl}
              onClose={handleMenuClose}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  <Typography textAlign="center">
                    <Link
                      to={pageRoutes[index]}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
