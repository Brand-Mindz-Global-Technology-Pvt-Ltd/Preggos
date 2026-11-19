

import { memo, useState } from "react";
import {
  Pencil,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Globe,
  User,
  Mail,
  Clock,
  Lock,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useProfile } from "../../../context/ProfileContext";

const SOCIAL_CONFIG = {
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  twitter: { icon: Twitter, label: "Twitter" },
  github: { icon: Github, label: "GitHub" },
  website: { icon: Globe, label: "Website" },
};

function ProfileCard({ title }) {
  const { profile, email, changePassword, loading } = useProfile();
  const adminRaw = localStorage.getItem("admin");
  const adminId = adminRaw ? JSON.parse(adminRaw).id : null;

  const [copied, setCopied] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCopy = async () => {
    if (!adminId) return;
    await navigator.clipboard.writeText(adminId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await changePassword({ newPassword: password, confirmPassword });
      alert("Password updated successfully");
      setPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  /* ===============================
     🔧 CHANGED: profileImage.url
     =============================== */
  const {
    firstName,
    lastName,
    profileImage,
    socialLinks = {},
  } = profile || {};

  const profileImageUrl = profileImage?.url || "https://prourls.link/9hrWiS"; // 🔧 CHANGED

  return (
    <aside className="rounded-xl bg-white p-4 sm:p-6">
      <h2 className="mb-4 font-semibold text-gray-800">{title}</h2>

      <div className="flex flex-col items-start gap-2">
        <img
          src={profileImageUrl} // 🔧 CHANGED
          alt="Profile"
          className="h-24 w-24 rounded-full ring-4 ring-green-300 ring-offset-2 object-cover"
        />

        <div className="flex items-center gap-2 font-bold text-gray-800 pt-5">
          <User size={16} />
          {firstName || "FirstName"} {lastName || "LastName"}
        </div>

        <div className="flex items-center gap-2 text-gray-800">
          <Mail size={16} />
          {email || "Email"}
        </div>

        <div className="flex items-center gap-2 text-xs text-green-700">
          <Clock size={14} /> Just now
        </div>

        <div className="mt-3 flex w-full justify-between items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs">
          <span className="truncate pr-2">
            User ID: {adminId ? `${adminId.slice(0, 15)}...` : "—"}
          </span>
          <div className="h-4 w-px bg-gray-300"></div>
          <button
            onClick={handleCopy}
            className="ml-2 text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-6 gap-3">
          {Object.entries(socialLinks).map(([key, url]) => {
            if (!url || !SOCIAL_CONFIG[key]) return null;
            const Icon = SOCIAL_CONFIG[key].icon;

            return (
              <SocialIcon
                key={key}
                label={SOCIAL_CONFIG[key].label}
                link={url}
              >
                <Icon size={18} />
              </SocialIcon>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            <Lock size={16} /> Change Password
          </span>

          <button
            onClick={() => setShowPasswordForm((p) => !p)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {showPasswordForm ? <X size={18} /> : <Pencil size={18} />}
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-4 space-y-3">
            <PasswordInput
              value={password}
              onChange={setPassword}
              show={showPassword}
              toggle={() => setShowPassword((p) => !p)}
              placeholder="New password"
            />

            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword((p) => !p)}
              placeholder="Confirm password"
            />

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 transition bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
        >
          <Trash2 size={16} />
          Delete User
        </button>
      </div>
    </aside>
  );
}

export default memo(ProfileCard);

/* ===============================
   SUPPORT COMPONENTS
   =============================== */

const SocialIcon = memo(({ label, link, children }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition"
  >
    {children}
  </a>
));

const PasswordInput = memo(({ value, onChange, show, toggle, placeholder }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border px-3 py-2 text-sm pr-10"
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {show ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  </div>
));
