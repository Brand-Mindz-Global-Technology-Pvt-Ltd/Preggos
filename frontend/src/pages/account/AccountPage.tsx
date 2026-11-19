import { useState, useEffect, useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RefreshCw,
  User,
  Phone,
} from "lucide-react";

import preggosLogo from "../../assets/images/Preggos Logo.png";
import loginMom from "../../assets/images/home/auth/login-mom.png";
import regMom from "../../assets/images/home/auth/Reg-mom.png";
import forgotMom from "../../assets/images/home/auth/forgot-mom.png";
import leaf1 from "../../assets/images/home/auth/leaf-1.png";
import leaf2 from "../../assets/images/home/auth/leaf-2.png";
import heart1 from "../../assets/images/home/auth/heart-1.png";
import goldLeaf from "../../assets/images/home/leaf-png/gold-leaf.png";

type AuthMode = "login" | "otp" | "forgot" | "register";

/**
 * Removes pure white background (#ffffff) from the logo on a canvas
 * so it renders seamlessly without an unwanted rectangular white container.
 */
function useTransparentLogo(src: string): string {
  const [output, setOutput] = useState<string>(src);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Clear pure white / near-white pixels to transparent
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (active) {
          setOutput(canvas.toDataURL("image/png"));
        }
      } catch {
        // Fallback to original src if canvas operation is restricted
      }
    };
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);

  return output;
}

export function AccountPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Registration fields
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState("");

  // OTP fields
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Feedback states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Transparent logo hook
  const transparentLogo = useTransparentLogo(preggosLogo);

  // Timer countdown for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  // Handle standard password login
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your email address or mobile number");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isMobile = /^[6-9]\d{9}$/.test(trimmed.replace(/\s+/g, ""));

    if (!isEmail && !isMobile) {
      setError("Please enter a valid 10-digit mobile number or email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Welcome back! Demo login successful for ${trimmed}. (Backend API integration in Phase 3)`);
    }, 700);
  };

  // Switch to OTP mode
  const handleSwitchToOtp = () => {
    setError(null);
    setSuccess(null);
    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your mobile number or email first to request an OTP");
      return;
    }
    setMode("otp");
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
  };

  // Handle OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const nextIdx = Math.min(pasted.length, 5);
    otpInputsRef.current[nextIdx]?.focus();
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`OTP verified successfully! Welcome to Preggos, ${identifier.trim() || "Mom"}.`);
    }, 700);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError(null);
    setSuccess("A fresh 6-digit OTP has been sent (Demo mode: enter any 6 digits).");
  };

  // Handle forgot password
  const handleForgotSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const email = forgotEmail.trim();
    if (!email) {
      setError("Please enter your registered email address");
      return;
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("A password reset link has been sent to your email address. Please check your inbox.");
    }, 700);
  };

  // Handle Registration
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const name = fullName.trim();
    if (!name) {
      setError("Please enter your full name");
      return;
    }

    const email = regEmail.trim();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    const mobile = regMobile.trim().replace(/\D/g, "");
    if (!mobile) {
      setError("Please enter your mobile number");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!regPassword) {
      setError("Please enter a password");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!regConfirmPassword) {
      setError("Please confirm your password");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms & Conditions and Privacy Policy to continue");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Account created successfully! Welcome to the Preggos family, ${name}.`);
      setTimeout(() => {
        setMode("login");
      }, 1500);
    }, 700);
  };

  const handleSocialClick = (provider: string) => {
    setSuccess(`Demo: ${provider} authentication modal launched. (OAuth integration in Phase 3)`);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#FBF7F0] py-6 px-4 sm:py-10 sm:px-6 flex items-center justify-center">
      {/* Import Caveat cursive font for the hand-drawn 'Welcome Back!' headline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap');
      `}</style>

      {/* Ambient background soft peach/gold curved aura matching Figma canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-[#FCE5D0]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#E5F5EF]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-[#FDEFE0]/50 blur-2xl"
      />

      {/* Main Centered Login Card - Balanced Split Proportions (44% Left / 56% Right) */}
      <div className="relative z-10 w-full max-w-[950px] overflow-hidden rounded-[28px] sm:rounded-[34px] bg-white shadow-[0_20px_60px_-15px_rgba(215,185,150,0.28)] border border-[#F0E6D8] transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
          
          {/* ======================================================== */}
          {/* LEFT PANEL: Branding, Welcome Typography & Visuals      */}
          {/* ======================================================== */}
          <div className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#FDF5EB] via-[#FAF0E2] to-[#F7E7D6] ${mode === "forgot" ? "min-h-[430px] lg:min-h-[490px]" : mode === "register" ? "min-h-[460px] lg:min-h-[540px]" : "min-h-[480px] lg:min-h-[560px]"}`}>
            
            {mode === "register" ? (
              /* ================================================================ */
              /* REGISTRATION LEFT PANEL: Join Our Preggos Family!                */
              /* ================================================================ */
              <div className="relative flex flex-col h-full w-full justify-between overflow-hidden">
                {/* Top-Left Botanical Leaf */}
                <div className="pointer-events-none absolute -left-5 sm:-left-7 top-1 sm:top-2 z-20 w-28 sm:w-36 select-none opacity-90">
                  <img
                    src={leaf2}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Top-Right Soft Accent Leaf */}
                <div className="pointer-events-none absolute -right-3 sm:-right-4 top-2 sm:top-3 z-0 w-16 sm:w-20 select-none opacity-60 rotate-45">
                  <img
                    src={goldLeaf}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Ambient Pastel Glows matching Registration reference */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/3 -left-14 h-48 w-48 rounded-full bg-[#FCE5D2]/75 blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[#FFF0E2]/80 blur-3xl"
                />

                {/* Bottom Organic Pastel Shapes (Peach mound & mint green wave) */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 sm:h-64 overflow-hidden z-0">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 440 240"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    {/* Soft peach mound behind mother & kids */}
                    <path
                      d="M -40 240 C 40 80, 200 60, 360 140 C 410 165, 440 195, 460 240 Z"
                      fill="#F8CEB4"
                      fillOpacity="0.85"
                    />
                    {/* Mint green shape on bottom-right */}
                    <path
                      d="M 160 240 C 230 140, 320 130, 410 160 C 445 175, 455 205, 460 240 Z"
                      fill="#BFE4D6"
                      fillOpacity="0.82"
                    />
                  </svg>
                </div>

                {/* Botanical Leaf Sprigs at Bottom */}
                {/* Bottom-Left Leaf: Gold Leaf sprig rotated toward outer left corner */}
                <div className="pointer-events-none absolute -left-2 sm:-left-3 bottom-3 sm:bottom-4 z-20 w-14 sm:w-16 lg:w-[70px] select-none opacity-85 -rotate-45">
                  <img
                    src={goldLeaf}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Bottom-Right Leaf: Green Leaf (Unchanged) */}
                <div className="pointer-events-none absolute right-2 sm:right-4 bottom-0 z-20 w-20 sm:w-24 select-none opacity-85">
                  <img
                    src={leaf1}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Top Centered Content: Logo, Heart, Heading, Subtitle */}
                <div className="relative z-20 w-full text-center pt-5 sm:pt-6 px-4">
                  {/* Preggos Logo */}
                  <div className="flex justify-center">
                    <Link to="/" className="inline-block transition hover:opacity-90">
                      <img
                        src={transparentLogo}
                        alt="Preggos - Nourish. Nurture. Together."
                        className="mx-auto h-[62px] sm:h-[70px] lg:h-[76px] w-auto object-contain mix-blend-multiply drop-shadow-2xs"
                      />
                    </Link>
                  </div>

                  {/* Heart-1 Doodle (Centered Above Heading) */}
                  <div className="mt-2 flex justify-center">
                    <img
                      src={heart1}
                      alt=""
                      aria-hidden="true"
                      className="h-3.5 sm:h-4 w-auto object-contain select-none opacity-85 -rotate-6"
                    />
                  </div>

                  {/* Cursive Heading: "Join Our Preggos Family!" */}
                  <h1
                    className="mt-0.5 text-center text-[28px] sm:text-[34px] lg:text-[38px] font-semibold leading-[1.06] text-[#241E52] tracking-tight"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Join Our<br />Preggos Family!
                  </h1>

                  {/* Subtitle */}
                  <p className="mx-auto mt-1.5 text-center max-w-[210px] sm:max-w-[230px] text-xs sm:text-[12.5px] font-normal leading-snug text-[#2E2858]/90">
                    Get exclusive offers,<br className="hidden sm:inline" /> wellness tips and more!
                  </p>
                </div>

                {/* Reg-Mom & Children Image: Centered & Anchored Bottom with Clear Spacing from Text */}
                <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[78%] sm:w-[82%] max-w-[340px] sm:max-w-[365px] select-none">
                  <img
                    src={regMom}
                    alt="Preggos Family - Mom and Children"
                    className="pointer-events-none h-auto w-full max-h-[285px] sm:max-h-[310px] lg:max-h-[325px] object-contain object-bottom select-none drop-shadow-xs"
                    loading="eager"
                  />
                </div>

                {/* Heart Doodles around Mom & Kids */}
                {/* 1. Heart with whiskers to the right of mother */}
                <div
                  className="pointer-events-none absolute bottom-[165px] sm:bottom-[175px] right-2 sm:right-4 z-20 flex items-center gap-1 select-none"
                  aria-hidden="true"
                >
                  <svg className="w-5 sm:w-6 h-3" viewBox="0 0 32 14" fill="none">
                    <path d="M 2 10 Q 18 14, 30 4" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  </svg>
                  <img src={heart1} alt="" className="h-5 sm:h-6 w-auto object-contain opacity-85 rotate-6" />
                  <svg className="w-5 sm:w-6 h-3" viewBox="0 0 32 14" fill="none">
                    <path d="M 2 4 Q 14 14, 30 10" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  </svg>
                </div>

                {/* 2. Heart to the left of mother */}
                <div
                  className="pointer-events-none absolute bottom-[135px] sm:bottom-[150px] left-2 sm:left-4 z-20 select-none"
                  aria-hidden="true"
                >
                  <img
                    src={heart1}
                    alt=""
                    className="h-4 sm:h-5 w-auto object-contain opacity-80 -rotate-12"
                  />
                </div>

                {/* 3. Lower-right heart beside young girl */}
                <div
                  className="pointer-events-none absolute bottom-[80px] sm:bottom-[90px] right-3 sm:right-6 z-20 select-none"
                  aria-hidden="true"
                >
                  <img
                    src={heart1}
                    alt=""
                    className="h-4 sm:h-5 w-auto object-contain opacity-80 rotate-12"
                  />
                </div>
              </div>
            ) : mode === "forgot" ? (
              /* ================================================================ */
              /* FORGOT PASSWORD LEFT PANEL: Forgot Password?                     */
              /* ================================================================ */
              <div className="relative flex flex-col h-full w-full justify-between overflow-hidden">
                {/* Top-Left Botanical Leaf */}
                <div className="pointer-events-none absolute -left-5 sm:-left-7 top-1 sm:top-2 z-20 w-28 sm:w-36 select-none opacity-90">
                  <img
                    src={leaf2}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Top-Right Soft Accent Leaf */}
                <div className="pointer-events-none absolute -right-3 sm:-right-4 top-2 sm:top-3 z-0 w-16 sm:w-20 select-none opacity-60 rotate-45">
                  <img
                    src={goldLeaf}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Ambient Pastel Glows matching visual theme */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/3 -left-14 h-48 w-48 rounded-full bg-[#FCE5D2]/75 blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[#FFF0E2]/80 blur-3xl"
                />

                {/* Bottom Organic Pastel Shapes (Peach mound & mint green wave) */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 sm:h-64 overflow-hidden z-0">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 440 240"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M -40 240 C 40 80, 200 60, 360 140 C 410 165, 440 195, 460 240 Z"
                      fill="#F8CEB4"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M 160 240 C 230 140, 320 130, 410 160 C 445 175, 455 205, 460 240 Z"
                      fill="#BFE4D6"
                      fillOpacity="0.82"
                    />
                  </svg>
                </div>

                {/* Botanical Leaf Sprigs at Bottom */}
                {/* Bottom-Left Gold Leaf sprig */}
                <div className="pointer-events-none absolute -left-2 sm:-left-3 bottom-3 sm:bottom-4 z-20 w-14 sm:w-16 lg:w-[70px] select-none opacity-85 -rotate-45">
                  <img
                    src={goldLeaf}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Bottom-Right Green Leaf */}
                <div className="pointer-events-none absolute right-2 sm:right-4 bottom-0 z-20 w-20 sm:w-24 select-none opacity-85">
                  <img
                    src={leaf1}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Top Centered Content: Logo, Heart, Heading, Subtitle */}
                <div className="relative z-20 w-full text-center pt-5 sm:pt-6 px-4">
                  {/* Preggos Logo */}
                  <div className="flex justify-center">
                    <Link to="/" className="inline-block transition hover:opacity-90">
                      <img
                        src={transparentLogo}
                        alt="Preggos - Nourish. Nurture. Together."
                        className="mx-auto h-[62px] sm:h-[70px] lg:h-[76px] w-auto object-contain mix-blend-multiply drop-shadow-2xs"
                      />
                    </Link>
                  </div>

                  {/* Heart-1 Doodle (Centered Above Heading) */}
                  <div className="mt-2 flex justify-center">
                    <img
                      src={heart1}
                      alt=""
                      aria-hidden="true"
                      className="h-3.5 sm:h-4 w-auto object-contain select-none opacity-85 -rotate-6"
                    />
                  </div>

                  {/* Cursive Heading: "Forgot Password?" */}
                  <h1
                    className="mt-0.5 text-center text-[28px] sm:text-[34px] lg:text-[38px] font-semibold leading-[1.08] text-[#241E52] tracking-tight"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Forgot Password?
                  </h1>

                  {/* Supporting text */}
                  <p className="mx-auto mt-1 text-center max-w-[240px] text-xs sm:text-[13px] font-normal leading-snug text-[#2E2858]/90">
                    Don't worry, we're here to help you!
                  </p>
                </div>

                {/* Forgot-Mom Image: Centered & Anchored Bottom with Clear Spacing from Text */}
                <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[78%] sm:w-[82%] max-w-[320px] sm:max-w-[350px] select-none">
                  <img
                    src={forgotMom}
                    alt="Preggos Support - Forgot Password"
                    className="pointer-events-none h-auto w-full max-h-[250px] sm:max-h-[275px] lg:max-h-[290px] object-contain object-bottom select-none drop-shadow-xs"
                    loading="eager"
                  />
                </div>

                {/* Heart Doodles around Mom */}
                <div
                  className="pointer-events-none absolute bottom-[145px] sm:bottom-[155px] right-3 sm:right-5 z-20 flex items-center gap-1 select-none"
                  aria-hidden="true"
                >
                  <svg className="w-5 sm:w-6 h-3" viewBox="0 0 32 14" fill="none">
                    <path d="M 2 10 Q 18 14, 30 4" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  </svg>
                  <img src={heart1} alt="" className="h-4.5 sm:h-5.5 w-auto object-contain opacity-85 rotate-6" />
                  <svg className="w-5 sm:w-6 h-3" viewBox="0 0 32 14" fill="none">
                    <path d="M 2 4 Q 14 14, 30 10" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  </svg>
                </div>

                <div
                  className="pointer-events-none absolute bottom-[120px] sm:bottom-[130px] left-3 sm:left-5 z-20 select-none"
                  aria-hidden="true"
                >
                  <img
                    src={heart1}
                    alt=""
                    className="h-4 sm:h-5 w-auto object-contain opacity-80 -rotate-12"
                  />
                </div>
              </div>
            ) : (
              /* ================================================================ */
              /* LOGIN LEFT PANEL: Existing Approved Layout (Untouched)           */
              /* ================================================================ */
              <>
                {/* Top-Left Botanical Leaf Decoration (leaf-2: moved 10px down, 10px further left) */}
                <div className="pointer-events-none absolute -left-[26px] sm:-left-[34px] top-[2px] sm:-top-[6px] z-20 w-32 sm:w-40 lg:w-44 select-none opacity-90">
                  <img
                    src={leaf2}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain select-none"
                  />
                </div>

                {/* Top-Right Soft Accent Sprig */}
                <div className="pointer-events-none absolute top-3 right-4 z-0 w-12 sm:w-14 select-none opacity-40 rotate-45">
                  <img
                    src={goldLeaf}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Top Background Soft Peach Aura */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-[#FCE5D2]/75 blur-xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/4 right-0 h-40 w-40 rounded-full bg-[#FAD9C3]/40 blur-2xl"
                />

                {/* ================================================================ */}
                {/* Mother Image: Height +14%, Anchored Bottom-Left, Natural Proportions */}
                {/* ================================================================ */}
                <div className="pointer-events-none absolute bottom-0 -left-5 sm:-left-7 lg:-left-8 z-10 w-[80%] sm:w-[84%] lg:w-[86%] max-w-[490px] sm:max-w-[530px] lg:max-w-[560px] select-none">
                  <img
                    src={loginMom}
                    alt="Preggos Mom and Children"
                    className="pointer-events-none h-auto w-full max-h-[700px] sm:max-h-[760px] lg:max-h-[800px] object-contain object-bottom-left select-none drop-shadow-xs"
                    loading="eager"
                  />
                </div>

                {/* ================================================================ */}
                {/* Right Side Block: Preggos Logo, Heart Doodles & Welcome Back Text */}
                {/* ================================================================ */}
                <div className="relative z-20 ml-auto w-full sm:w-[48%] lg:w-[48%] text-center pt-5 sm:pt-7 pb-4 sm:pb-6 px-3 sm:pr-5 sm:pl-0">
                  
                  {/* Preggos Logo: Sized +15% (h-[89px]/sm:h-[100px]/lg:h-[106px]), position unchanged */}
                  <div className="flex justify-center -translate-x-[102px] sm:-translate-x-[106px] lg:-translate-x-[108px]">
                    <Link to="/" className="inline-block transition hover:opacity-90">
                      <img
                        src={transparentLogo}
                        alt="Preggos - Nourish. Nurture. Together."
                        className="mx-auto h-[89px] sm:h-[100px] lg:h-[106px] w-auto object-contain mix-blend-multiply drop-shadow-2xs"
                      />
                    </Link>
                  </div>

                  {/* Heart-1 Decoration (Above Welcome Back) */}
                  <div className="mt-3 sm:mt-4 flex justify-center">
                    <img
                      src={heart1}
                      alt=""
                      aria-hidden="true"
                      className="h-5 sm:h-5.5 w-auto object-contain select-none opacity-90 -rotate-12"
                    />
                  </div>

                  {/* Cursive Handwriting Heading: "Welcome Back!" - Sized +2px, moved 10px further right */}
                  <div className="relative inline-block translate-x-[15px]">
                    <h1
                      className="mt-1 text-[32px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.05] text-[#241E52] tracking-tight"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      Welcome<br />Back!
                    </h1>

                    {/* Additional Decorative Heart 1: Upper-right area of Welcome Back heading */}
                    <div
                      className="pointer-events-none absolute -top-1 -right-6 sm:-right-7 lg:-right-8 z-20 select-none"
                      aria-hidden="true"
                    >
                      <img
                        src={heart1}
                        alt=""
                        className="h-3.5 sm:h-4 lg:h-[17px] w-auto object-contain opacity-80 rotate-[18deg]"
                      />
                    </div>
                  </div>

                  {/* Subtitle - Regular weight, clean line spacing, non-overlapping */}
                  <div className="relative mx-auto mt-2 max-w-[165px]">
                    <p className="text-xs sm:text-[12.5px] font-normal leading-[1.45] text-[#2E2858]/90">
                      Continue your journey towards a healthier, happier you.
                    </p>

                    {/* Additional Decorative Heart 2: Beside subtitle in the open right space */}
                    <div
                      className="pointer-events-none absolute top-1 -right-6 sm:-right-8 z-20 select-none"
                      aria-hidden="true"
                    >
                      <img
                        src={heart1}
                        alt=""
                        className="h-3 sm:h-3.5 w-auto object-contain opacity-75 -rotate-[14deg]"
                      />
                    </div>
                  </div>

                  {/* Heart-1 Decoration with Whisker Strokes (Below Subtitle) */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 sm:gap-2" aria-hidden="true">
                    {/* Left curved brush flourish */}
                    <svg className="w-7 sm:w-8 h-3.5" viewBox="0 0 32 14" fill="none">
                      <path d="M 2 10 Q 18 14, 30 4" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                    </svg>
                    {/* Heart-1 Asset */}
                    <img
                      src={heart1}
                      alt=""
                      aria-hidden="true"
                      className="h-6 sm:h-7 w-auto object-contain select-none opacity-90"
                    />
                    {/* Right curved brush flourish */}
                    <svg className="w-7 sm:w-8 h-3.5" viewBox="0 0 32 14" fill="none">
                      <path d="M 2 4 Q 14 14, 30 10" stroke="#EF6241" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                    </svg>
                  </div>
                </div>

                {/* Additional Decorative Heart 3: Tiny heart in available decorative space above bottom waves */}
                <div
                  className="pointer-events-none absolute bottom-[165px] sm:bottom-[195px] lg:bottom-[210px] right-7 sm:right-11 lg:right-14 z-20 select-none"
                  aria-hidden="true"
                >
                  <img
                    src={heart1}
                    alt=""
                    className="h-2.5 sm:h-3 lg:h-3.5 w-auto object-contain opacity-70 rotate-[12deg]"
                  />
                </div>

                {/* Bottom Layered Pastel Mounds & Botanical Leaf Sprig */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 sm:h-52 lg:h-56 overflow-hidden z-0">
                  {/* Soft layered curved mounds matching Figma reference */}
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 440 200"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    {/* Subtle warm backdrop wave */}
                    <path
                      d="M 160 200 C 240 110, 350 100, 460 130 L 460 200 Z"
                      fill="#F9E6D4"
                      fillOpacity="0.75"
                    />
                    {/* Warm peach curved mound behind mother & daughter */}
                    <path
                      d="M -30 200 C 50 70, 170 60, 300 120 C 370 155, 420 170, 460 200 Z"
                      fill="#F8CEB4"
                      fillOpacity="0.88"
                    />
                    {/* Mint-green curved shape on bottom-right */}
                    <path
                      d="M 120 200 C 190 120, 280 110, 370 130 C 415 140, 445 170, 460 200 Z"
                      fill="#BFE4D6"
                      fillOpacity="0.85"
                    />
                  </svg>

                  {/* Bottom Right Botanical Leaf Decoration (leaf-1: upright vertical branch matching Figma) */}
                  <div className="pointer-events-none absolute bottom-0 right-2 sm:right-4 lg:right-6 z-10 w-20 sm:w-24 lg:w-28 select-none opacity-90">
                    <img
                      src={leaf1}
                      alt=""
                      aria-hidden="true"
                      className="h-auto w-full object-contain select-none"
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          {/* ======================================================== */}
          {/* RIGHT PANEL: Login & Authentication Form                 */}
          {/* ======================================================== */}
          <div className={`flex flex-col justify-center bg-gradient-to-br from-[#FFFCF7] via-[#FFF9F2] to-[#FFF5EC] ${mode === "register" ? "p-5 sm:p-7 lg:py-7 lg:px-9" : "p-6 sm:p-8 lg:p-10"}`}>
            
            {/* Header Titles */}
            <div>
              <h2 className="text-2xl sm:text-[30px] font-extrabold text-[#112440] tracking-tight">
                {mode === "login" && "Login"}
                {mode === "otp" && "Verify OTP"}
                {mode === "forgot" && "Reset Your Password"}
                {mode === "register" && "Create Account"}
              </h2>
              <p className="mt-1.5 text-xs sm:text-[13.5px] text-[#6C757D]">
                {mode === "login" && "Enter your details to access your account"}
                {mode === "otp" && `We sent a 6-digit verification code to ${identifier || "your device"}`}
                {mode === "forgot" && "Enter your registered email address to receive a password reset link."}
                {mode === "register" && "Start your journey with Preggos"}
              </p>
            </div>

            {/* Error & Success Feedback Banners */}
            {error && (
              <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs text-red-600">
                <AlertCircle size={15} className="shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                <span>{success}</span>
              </div>
            )}

            {/* ==================================================== */}
            {/* VIEW 1: STANDARD PASSWORD LOGIN (Default Reference)  */}
            {/* ==================================================== */}
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3.5">
                
                {/* Input 1: Email or Mobile */}
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Email Address or Mobile Number"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-3 pl-11 pr-4 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                </div>

                {/* Input 2: Password */}
                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Password"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-3 pl-11 pr-11 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2] hover:text-[#112440] transition focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Controls: Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-0.5 text-xs sm:text-[13px]">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#112440] font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#F15A24] focus:ring-[#F15A24]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccess(null);
                      setMode("forgot");
                    }}
                    className="font-semibold text-[#5A4FCF] hover:underline transition"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button: Orange Pill with Arrow */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] py-3.5 px-6 font-bold text-white text-sm sm:text-base shadow-[0_6px_20px_rgba(241,90,36,0.32)] hover:shadow-[0_8px_25px_rgba(241,90,36,0.42)] hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Quick Option: Login via OTP */}
                <div className="text-center pt-0.5">
                  <button
                    type="button"
                    onClick={handleSwitchToOtp}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#112440]/70 hover:text-[#F15A24] transition"
                  >
                    <KeyRound size={12} />
                    <span>Or login quickly with OTP</span>
                  </button>
                </div>

                {/* Divider: OR */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="w-full border-t border-[#E8DFD5]" />
                  <span className="absolute bg-[#FFF8F0] px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest rounded-full">
                    OR
                  </span>
                </div>

                {/* Google Login Button (Apple completely removed, balanced full width) */}
                <button
                  type="button"
                  onClick={() => handleSocialClick("Google")}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-2xs cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Footer Switch: Don't have an account? Create Account */}
                <p className="mt-4 text-center text-xs sm:text-[13.5px] text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccess(null);
                      setMode("register");
                    }}
                    className="font-bold text-[#F15A24] hover:underline transition cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {/* ==================================================== */}
            {/* VIEW 2: OTP VERIFICATION INTERACTION                 */}
            {/* ==================================================== */}
            {mode === "otp" && (
              <form onSubmit={handleVerifyOtp} className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-1.5 sm:gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="h-11 w-10 sm:h-12 sm:w-11 rounded-xl border border-[#E2E8F0] bg-white text-center text-base sm:text-lg font-bold text-[#112440] shadow-2xs outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/15"
                    />
                  ))}
                </div>

                {/* Countdown & Resend Option */}
                <div className="flex items-center justify-between text-xs sm:text-[13px]">
                  <span className="text-gray-500">
                    {timer > 0 ? (
                      <>Resend code in <strong className="text-[#112440]">{timer}s</strong></>
                    ) : (
                      "Didn't receive the code?"
                    )}
                  </span>
                  <button
                    type="button"
                    disabled={!canResend}
                    onClick={handleResendOtp}
                    className="font-semibold text-[#F15A24] hover:underline disabled:opacity-40 disabled:hover:no-underline transition"
                  >
                    Resend OTP
                  </button>
                </div>

                {/* Submit OTP */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] py-3 px-6 font-bold text-white text-sm sm:text-[15px] shadow-[0_6px_20px_rgba(241,90,36,0.3)] hover:shadow-[0_8px_25px_rgba(241,90,36,0.4)] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="h-4.5 w-4.5 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Verify &amp; Access Account</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Back to password login */}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccess(null);
                    setMode("login");
                  }}
                  className="w-full text-center text-xs sm:text-[13px] font-semibold text-gray-600 hover:text-[#112440] flex items-center justify-center gap-1.5 transition pt-1"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Password Login</span>
                </button>
              </form>
            )}

            {/* ==================================================== */}
            {/* VIEW 3: FORGOT PASSWORD                              */}
            {/* ==================================================== */}
            {mode === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="mt-5 sm:mt-6 space-y-4">
                {/* One rounded input field: Email Address* */}
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Email Address*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-3 sm:py-3.5 pl-11 pr-4 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                </div>

                {/* Orange full-width button: Send Reset Link → */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] py-3.5 px-6 font-bold text-white text-sm sm:text-base shadow-[0_6px_20px_rgba(241,90,36,0.32)] hover:shadow-[0_8px_25px_rgba(241,90,36,0.42)] hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={17} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Bottom navigation: ← Back to Login */}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccess(null);
                    setMode("login");
                  }}
                  className="w-full text-center text-xs sm:text-[13.5px] font-semibold text-gray-600 hover:text-[#F15A24] flex items-center justify-center gap-1.5 transition pt-1 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Login</span>
                </button>
              </form>
            )}

            {/* ==================================================== */}
            {/* VIEW 4: CREATE ACCOUNT / REGISTER                    */}
            {/* ==================================================== */}
            {mode === "register" && (
              <form onSubmit={handleRegisterSubmit} className="mt-4 sm:mt-5 space-y-3">
                {/* Input 1: Full Name */}
                <div className="relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Full Name*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-11 pr-4 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                </div>

                {/* Input 2: Email Address */}
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Email Address*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-11 pr-4 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                </div>

                {/* Input 3: Mobile Number */}
                <div className="relative">
                  <Phone
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regMobile}
                    onChange={(e) => {
                      setRegMobile(e.target.value.replace(/\D/g, ""));
                      if (error) setError(null);
                    }}
                    placeholder="Mobile Number*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-11 pr-4 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                </div>

                {/* Input 4: Password */}
                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => {
                      setRegPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Password*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-11 pr-11 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2] hover:text-[#112440] transition focus:outline-none"
                    aria-label={showRegPassword ? "Hide password" : "Show password"}
                  >
                    {showRegPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {/* Input 5: Confirm Password */}
                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2]"
                  />
                  <input
                    type={showRegConfirmPassword ? "text" : "password"}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => {
                      setRegConfirmPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Confirm Password*"
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-11 pr-11 text-xs sm:text-sm text-[#112440] placeholder:text-[#94A3B8] outline-none transition focus:border-[#F15A24] focus:ring-3 focus:ring-[#F15A24]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E95A2] hover:text-[#112440] transition focus:outline-none"
                    aria-label={showRegConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showRegConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs sm:text-[13px] text-[#112440]">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (error) setError(null);
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#F15A24] focus:ring-[#F15A24]"
                    />
                    <span className="leading-snug">
                      I agree to the{" "}
                      <span className="font-bold text-[#F15A24]">Terms &amp; Conditions</span>{" "}
                      and{" "}
                      <span className="font-bold text-[#F15A24]">Privacy Policy</span>
                    </span>
                  </label>
                </div>

                {/* Submit: Create Account Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] py-3.5 px-6 font-bold text-white text-sm sm:text-base shadow-[0_6px_20px_rgba(241,90,36,0.32)] hover:shadow-[0_8px_25px_rgba(241,90,36,0.42)] hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={17} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Divider: OR */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="w-full border-t border-[#E8DFD5]" />
                  <span className="absolute bg-[#FFF8F0] px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest rounded-full">
                    OR
                  </span>
                </div>

                {/* Social Login Button: Continue with Google (Centered Horizontally) */}
                <button
                  type="button"
                  onClick={() => handleSocialClick("Google")}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-2xs cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Footer Switch: Already have an account? Login */}
                <p className="mt-3.5 text-center text-xs sm:text-[13.5px] text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccess(null);
                      setMode("login");
                    }}
                    className="font-bold text-[#F15A24] hover:underline transition cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
export default AccountPage;
