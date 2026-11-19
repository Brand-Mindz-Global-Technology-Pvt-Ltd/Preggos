import { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../schema/authschema";
import { useAuth } from "../context/Authcontext";
import logo from "../assets/Imgaes/full.png";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none " +
  "focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate("")
  const handleSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        await forgotPassword(values.email);
        resetForm();
        navigate("/auth/login")
      } finally {
        setSubmitting(false);
      }
    },
    [forgotPassword]
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="h-14 bg-gradient-to-r from-indigo-900 to-indigo-800 flex items-center px-6">
        <img
          src={logo}
          alt="Brand logo"
          className="h-16 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
          loading="lazy"
        />      </header>

      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="Brand logo"
              className="mx-auto h-17 w-32 sm:w-40 md:w-48 object-contain"
              loading="lazy"
            />            <h1 className="mt-3 font-bold text-xl sm:text-2xl">
              Forgot Password?
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Enter your email to receive a reset link
            </p>
          </div>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 py-2.5 text-white text-sm"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-5 text-center text-sm text-slate-500">
            Remembered?{" "}
            <Link to="/auth/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
