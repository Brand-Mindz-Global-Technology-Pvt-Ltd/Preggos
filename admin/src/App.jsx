import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

/* ---------------- Lazy Imports ---------------- */
const Loginpage = lazy(() => import("./pages/auth/Loginpage"));
const Registerpage = lazy(() => import("./pages/auth/Registerpage"));
const ForgotpasswordPage = lazy(() => import("./pages/auth/ForgotpasswordPage"));
const ResetpasswordPage = lazy(() => import("./pages/auth/ResetpasswordPage"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));


export default function App() {
  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<Loginpage />} />
          <Route path="/auth/register" element={<Registerpage />} />
          <Route path="/auth/forgotpassword" element={<ForgotpasswordPage />} />
          <Route path="/auth/resetpassword/:token" element={<ResetpasswordPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
