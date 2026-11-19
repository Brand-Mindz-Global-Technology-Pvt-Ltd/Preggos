


import { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { loginSchema } from "../schema/authschema";
import { useAuth } from "../context/Authcontext";
import logo from "../assets/Imgaes/full.png";

/* ------------------ Reusable input styles ------------------ */
const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none " +
    "focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);

    /* ------------------ Caps Lock handler ------------------ */
    const handleCapsLock = (e) => {
        if (typeof e.getModifierState === "function") {
            setCapsLockOn(e.getModifierState("CapsLock"));
        }
    };

    const handleSubmit = useCallback(
        async (values, { setSubmitting }) => {
            try {
                await login(values);
                const admin = JSON.parse(localStorage.getItem("admin") || "{}");
                if (admin?.id) {
                    navigate(`/admin/dashboard?id=${admin.id}`, { replace: true });
                }
            } finally {
                setSubmitting(false);
            }
        },
        [login, navigate]
    );

    return (
        <div className="min-h-screen bg-slate-100">
            {/* TOP NAVBAR */}
            <header className="bg-gradient-to-r from-indigo-900 to-indigo-800 flex items-center px-4 sm:px-6 h-12 sm:h-14 md:h-16">
                <img
                    src={logo}
                    alt="Brand logo"
                    className="h-16 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
                    loading="lazy"
                />
            </header>

            {/* PAGE CONTENT */}
            <main className="flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    {/* HEADER */}
                    <div className="text-center mb-8">
                        <img
                            src={logo}
                            alt="Brand logo"
                            className="mx-auto h-17 w-32 sm:w-40 md:w-48 object-contain"
                            loading="lazy"
                        />
                        <h1 className="mt-3 font-bold text-slate-900 text-xl sm:text-2xl md:text-3xl">
                            Welcome Back!
                        </h1>
                        <p className="mt-1 text-slate-500 text-sm sm:text-base">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    {/* FORM */}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className={inputClass}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <Link
                                            to="/auth/forgotpassword"
                                            className="text-sm text-indigo-600 hover:underline"
                                        >
                                            Forgot?
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <Field
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className={`${inputClass} pr-10`}
                                            onKeyUp={handleCapsLock}
                                            onBlur={() => setCapsLockOn(false)}
                                        />
                                        <button
                                            type="button"
                                            aria-label="Toggle password visibility"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                        >
                                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>

                                    {/* CAPS LOCK WARNING */}
                                    {capsLockOn && (
                                        <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 font-medium">
                                            <AlertTriangle size={14} />
                                            Caps Lock is ON
                                        </div>
                                    )}

                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-gradient-to-r from-indigo-700 to-indigo-600 hover:from-indigo-800 hover:to-indigo-700 py-2.5 text-white text-sm font-medium transition disabled:opacity-60"
                                >
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* FOOTER */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don’t have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
