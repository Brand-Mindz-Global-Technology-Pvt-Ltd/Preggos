import { Route, Routes } from "react-router-dom";
import { StoreLayout } from "./components/layout/StoreLayout";
import { HomePage } from "./pages/home/HomePage";
import { ShopPage } from "./pages/shop/ShopPage";
import { ProductDetailsPage } from "./pages/product/ProductDetailsPage";
import { CartPage } from "./pages/cart/CartPage";
import { WishlistPage } from "./pages/wishlist/WishlistPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { AboutPage } from "./pages/about/AboutPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { AccountPage } from "./pages/account/AccountPage";
import { ShippingPolicyPage } from "./pages/legal/ShippingPolicyPage";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";

export default function App() {
  return <Routes><Route element={<StoreLayout />}><Route path="/" element={<HomePage />} /><Route path="/shop" element={<ShopPage />} /><Route path="/product/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/wishlist" element={<WishlistPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/account" element={<AccountPage />} /><Route path="/shipping" element={<ShippingPolicyPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}
