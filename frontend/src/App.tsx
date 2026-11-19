import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { StoreLayout } from "./components/layout/StoreLayout";
import { HomePage } from "./pages/home/HomePage";
import { ShopPage } from "./pages/shop/ShopPage";
import { ProductDetailsPage } from "./pages/product/ProductDetailsPage";
import { CartPage } from "./pages/cart/CartPage";
import { WishlistPage } from "./pages/wishlist/WishlistPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { PaymentPage } from "./pages/payment/PaymentPage";
import { AboutPage } from "./pages/about/AboutPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { AccountPage } from "./pages/account/AccountPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ShippingPolicyPage } from "./pages/legal/ShippingPolicyPage";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF7]" />}>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/our-story" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<AccountPage />} />
          <Route path="/shipping" element={<ShippingPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
