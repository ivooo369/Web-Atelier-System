import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./layouts/others/ScrollToTopButton";
import Layout from "./layouts/structure/Layout";
import CalculatorHeader from "./layouts/structure/CalculatorHeader";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import CalculatorPage from "./pages/CalculatorPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="products/:productName" element={<ProductPage />} />
          </Route>
          <Route path="/calculator" element={<CalculatorHeader />}>
            <Route index element={<CalculatorPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
