import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./layouts/others/ScrollToTopButton";
import Layout from "./layouts/structure/Layout";
import CalculatorHeader from "./layouts/structure/CalculatorHeader";
import HomePage from "./pages/site/HomePage";
import NewProductsPage from "./pages/site/NewProductsPage";
import GalleryPage from "./pages/site/GalleryPage";
import ContactPage from "./pages/site/ContactPage";
import FramesPage from "./pages/site/FramesPage";
import ProfilesPage from "./pages/site/ProfilesPage";
import MatboardsPage from "./pages/site/MatboardsPage";
import GobelinsPage from "./pages/site/GobelinsPage";
import PanelsPage from "./pages/site/PanelsPage";
import MirrorsPage from "./pages/site/MirrorsPage";
import IconsPage from "./pages/site/IconsPage";
import ArtMaterialsPage from "./pages/site/ArtMaterialsPage";
import ProductDetailsPage from "./pages/site/ProductDetailsPage";
import SearchResultsPage from "./pages/site/SearchResultsPage";
import SignInPage from "./pages/site/SignInPage";
import SignUpPage from "./pages/site/SignUpPage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import CartPage from "./pages/calculator/CartPage";
import AdminLogin from "./pages/dashboard/AdminLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductsDashboard from "./pages/dashboard/ProductsDashboard";
import OrdersDashboard from "./pages/dashboard/OrdersDashboard";
import MessagesDashboard from "./pages/dashboard/MessagesDashboard";
import PageNotFound from "./pages/site/PageNotFound";
import EditProductPage from "./pages/dashboard/EditProductPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products/new-products" element={<NewProductsPage />} />
            <Route path="products/frames" element={<FramesPage />} />
            <Route path="products/profiles" element={<ProfilesPage />} />
            <Route path="products/matboards" element={<MatboardsPage />} />
            <Route path="products/gobelins" element={<GobelinsPage />} />
            <Route path="products/panels" element={<PanelsPage />} />
            <Route path="products/mirrors" element={<MirrorsPage />} />
            <Route path="products/icons" element={<IconsPage />} />
            <Route
              path="products/art-materials"
              element={<ArtMaterialsPage />}
            />
            <Route
              path="products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="products/search" element={<SearchResultsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="calculator" element={<CalculatorHeader />}>
              <Route index element={<CalculatorPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Route>
          <Route path="/admin">
            <Route index element={<PageNotFound />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsDashboard />} />
              <Route
                path="products/edit/:productId"
                element={<EditProductPage />}
              />
              <Route path="orders" element={<OrdersDashboard />} />
              <Route path="messages" element={<MessagesDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
