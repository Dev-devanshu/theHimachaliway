import ProductDetailPage from "./app/ProductDetail/ProductDetailPage";
import LegalPage from "./app/Legal/LegalPage";
import NotFoundPage from "./app/NotFound/NotFoundPage";
import ThankYouPage from "./app/ThankYou/ThankYouPage";
import DashboardPage from "./app/Dashboard/DashboardPage";
import HomePage from "./app/HomePage/HomePage";
import { ScrollToTop } from "./lib/ScrollToTop";
import { usePageMeta } from "./lib/usePageMeta";
import { AboutUsPage } from "./app/AboutUsPage/AboutUsPage";
import { BlogPage } from "./app/BlogPage/BlogPage";
import { ContactPage } from "./app/ContactPage/ContactPage";
import { ProductsPage } from "./app/Products/Products";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

const legalMeta = {
  privacy: ["Privacy Policy | The Himachali Way", "How The Himachali Way collects, uses and protects your personal information.", "/privacy-policy"],
  terms: ["Terms & Conditions | The Himachali Way", "Terms for using thehimachaliway.com and ordering our handmade pickles.", "/terms"],
  shipping: ["Shipping & Returns | The Himachali Way", "Delivery timelines, damaged-item replacements, cancellations and refunds.", "/shipping-returns"],
};
const LegalRoute = ({ page }) => {
  usePageMeta(...legalMeta[page]);
  return <LegalPage page={page} />;
};

const FloatingCall = () =>
  useLocation().pathname.startsWith("/dashboard") ? null : (
    <a
      href="tel:+918091736987"
      aria-label="Call Us Now"
      className="fixed z-50 bottom-5 sm:bottom-6 right-3 sm:right-5 pointer-events-auto"
    >
      <img
        src="/svg/whatsapp.png"
        alt="WhatsApp"
        className="block w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl animate-bounce-slow"
      />
    </a>
  );

export const App = () => {
  const HomeRoute = () => (
      usePageMeta(
        "Fresh & Flavorful Pickles | Best Spicy Indian Achars Online",
        "Discover the finest traditional Indian pickles (Achars) crafted with generations-old recipes. Taste the tangy crunch and bold, spicy flavor. Order online now!",
        "/",
      ),
      <HomePage />
    ),
    ProductsRoute = () => (
      usePageMeta(
        "Our Product Range | All Delicious Pickle Varieties",
        "Explore our full range of fresh, flavorful, and spicy Indian pickles. See all available Achars and order your favorite today.",
        "/products",
      ),
      (
        <>
          <ProductsPage />
        </>
      )
    ),
    BlogsRoute = () => (
      usePageMeta(
        "Pickle Blog & Recipes | Updates and Stories from Our Kitchen",
        "Read our latest blog posts on pickle making, traditional recipes, health benefits of Achars, and company news.",
        "/blogs",
      ),
      (
        <>
          <BlogPage />
        </>
      )
    ),
    AboutRoute = () => (
      usePageMeta(
        "About Us | Our Story & Traditional Pickle Making",
        "Learn about our commitment to quality, traditional methods, and the journey of crafting the finest Indian pickles (Achars).",
        "/about-us",
      ),
      (
        <>
          <AboutUsPage />
        </>
      )
    ),
    ContactRoute = () => (
      usePageMeta(
        "Contact Us | Get in Touch for Orders & Queries",
        "Have questions about our pickles or want to place a bulk order? Contact our team today via phone or email.",
        "/contact-us",
      ),
      (
        <>
          <ContactPage />
        </>
      )
    );
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="overflow-x-clip">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/products" element={<ProductsRoute />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/blogs" element={<BlogsRoute />} />
          <Route path="/about-us" element={<AboutRoute />} />
          <Route path="/contact-us" element={<ContactRoute />} />
          <Route path="/privacy-policy" element={<LegalRoute page="privacy" />} />
          <Route path="/terms" element={<LegalRoute page="terms" />} />
          <Route path="/shipping-returns" element={<LegalRoute page="shipping" />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FloatingCall />
      </div>
    </BrowserRouter>
  );
};

export default App;
