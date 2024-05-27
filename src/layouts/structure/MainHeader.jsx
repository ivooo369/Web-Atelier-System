import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Hidden from "@mui/material/Hidden";
import {
  productsMenuItems,
  productsMenuIcons,
  productsMenuRoutes,
} from "../../utils/menuData";
import HeaderSearchBar from "../others/HeaderSearchBar";

const BrandText = "Ателие БРИКС";
const pages = ["Начало", "Продукти", "Галерия", "Контакти"];
const pageRoutes = ["/", "/products/new-products", "/gallery", "/contacts"];

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
          background:
            "linear-gradient(60deg, rgb(41 50 60 / 85%) 0%, rgb(72 85 99 / 85%) 100%);",
          backgroundBlendMode: "multiply, multiply",
        },
      },
    },
  },
});

export default function Header() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [productsMenuAnchorEl, setProductsMenuAnchorEl] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [customerEmail, setCustomerEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("customerAuthToken")
  );

  const handleSignOut = () => {
    localStorage.removeItem("customerAuthToken");
    localStorage.removeItem("customerEmail");
    setCustomerEmail("");
    setIsLoggedIn(false);
    window.location.reload();
  };

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
      setScreenWidth(window.innerWidth);
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

  useEffect(() => {
    const email = localStorage.getItem("customerEmail");
    if (email) {
      setCustomerEmail(email);
    }
    setIsLoggedIn(!!localStorage.getItem("customerAuthToken"));
  }, []);

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
              className="logo"
              sx={{
                fontFamily: "monospace",
                fontWeight: 900,
                color: "inherit",
                textDecoration: "none",
                marginRight: "auto",
              }}
            >
              {BrandText}
            </Typography>
            <div className="header-centered-items">
              <Hidden lgDown>
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
                            <Link
                              key={product}
                              className="products-menu-links"
                              to={`/products/${productsMenuRoutes[index]}`}
                            >
                              <MenuItem
                                onClick={() => setProductsMenuAnchorEl(null)}
                                sx={{
                                  fontWeight: 700,
                                  paddingTop: 0,
                                  paddingBottom: 0,
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  {productsMenuIcons[index]}
                                </span>
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
              <div className="searchbar-and-menu">
                <HeaderSearchBar />
                <Hidden lgUp>
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
              </div>
            </div>
            <div className="account-buttons-container">
              {isLoggedIn ? (
                <>
                  <Typography variant="body1" sx={{ marginRight: "1rem" }}>
                    {customerEmail}
                  </Typography>
                  <Button
                    variant="contained"
                    id="sign-out-button"
                    onClick={handleSignOut}
                  >
                    Изход
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="contained" id="sign-in-button">
                      Вход
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button variant="contained" id="sign-up-button">
                      Регистрация
                    </Button>
                  </Link>
                </>
              )}
            </div>
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
