
import { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { registerSchema } from "../schema/authschema";
import { useAuth } from "../context/Authcontext";
import logo from "../assets/Imgaes/full.png";

/* ------------------ Reusable input styles ------------------ */
const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none " +
    "focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);

    /* ------------------ Caps Lock handler ------------------ */
    const handleCapsLock = (e) => {
        if (typeof e.getModifierState === "function") {
            setCapsLockOn(e.getModifierState("CapsLock"));
        }
    };

    /* ------------------ Submit handler ------------------ */
    const handleSubmit = useCallback(
        async (values, { setSubmitting }) => {
            try {
                await register(values);
                navigate("/auth/login", { replace: true });
            } finally {
                setSubmitting(false);
            }
        },
        [register, navigate]
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
            <main className="flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    {/* HEADER */}
                    <div className="text-center mb-6">
                        <img
                            src={logo}
                            alt="Brand logo"
                            className="mx-auto h-17 w-32 sm:w-40 md:w-48 object-contain"
                            loading="lazy"
                        />
                        <h1 className="mt-2 font-bold text-slate-900 text-xl sm:text-2xl md:text-3xl">
                            Create Your Account
                        </h1>
                        <p className="mt-1 text-slate-500 text-sm sm:text-base">
                            Join us and start managing your business.
                        </p>
                    </div>

                    {/* FORM */}
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            acceptTerms: false,
                        }}
                        validationSchema={registerSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                {/* USERNAME */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        name="username"
                                        placeholder="Enter username"
                                        className={inputClass}
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="p"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter email address"
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <Field
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            className={`${inputClass} pr-10`}
                                            onKeyUp={handleCapsLock}
                                            onBlur={() => setCapsLockOn(false)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                        >
                                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>

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

                                {/* CONFIRM PASSWORD */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <Field
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            className={`${inputClass} pr-10`}
                                            onKeyUp={handleCapsLock}
                                            onBlur={() => setCapsLockOn(false)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword((p) => !p)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                        >
                                            {showConfirmPassword ? (
                                                <Eye size={18} />
                                            ) : (
                                                <EyeOff size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {capsLockOn && (
                                        <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 font-medium">
                                            <AlertTriangle size={14} />
                                            Caps Lock is ON
                                        </div>
                                    )}
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="p"
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                {/* TERMS */}
                                <div>
                                    <label className="flex items-start gap-2 text-sm text-slate-600">
                                        <Field
                                            type="checkbox"
                                            name="acceptTerms"
                                            className="mt-1 accent-indigo-600"
                                        />
                                        <span>
                                            I agree to the{" "}
                                            <Link
                                                to="/terms"
                                                className="text-blue-600 font-medium hover:underline"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </span>
                                    </label>
                                    <ErrorMessage
                                        name="acceptTerms"
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
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* FOOTER */}
                    <p className="mt-5 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
