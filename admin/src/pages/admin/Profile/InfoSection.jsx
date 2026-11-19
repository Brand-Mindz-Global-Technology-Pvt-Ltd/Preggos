

import { useState, useEffect } from "react";
import { Pencil, Save, X } from "lucide-react";
import {
  User,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Globe,
} from "lucide-react";
import { useProfile } from "../../../context/ProfileContext";

const FIELD_TEMPLATE = [
  { key: "profileImage", label: "Profile Image", type: "image", value: "" },
  { key: "firstName", label: "First Name", value: "", icon: User },
  { key: "lastName", label: "Last Name", value: "", icon: User },
  { key: "email", label: "Email Address", value: "", icon: Mail },
  { key: "phone", label: "Phone Number", value: "", icon: Phone },
  { key: "facebook", label: "Facebook", value: "", icon: Facebook },
  { key: "instagram", label: "Instagram", value: "", icon: Instagram },
  { key: "linkedin", label: "LinkedIn", value: "", icon: Linkedin },
  { key: "twitter", label: "Twitter (X)", value: "", icon: Twitter },
  { key: "github", label: "GitHub", value: "", icon: Github },
  { key: "website", label: "Website", value: "", icon: Globe },
];

export default function InfoSection({ title }) {
  const { profile, email, updateProfile, loading } = useProfile();
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState(FIELD_TEMPLATE);

  useEffect(() => {
    const social = profile?.socialLinks || {};
    setFields((prev) =>
      prev.map((field) => {
        let value = field.value;
        if (field.key === "profileImage") {
          value = profile?.profileImage?.url || "";
        } else if (field.key === "email") {
          value = email || "";
        } else if (field.key in social) {
          value = social[field.key] || "";
        } else if (field.key in (profile || {})) {
          value = profile[field.key] || "";
        }
        return { ...field, value };
      })
    );
  }, [profile, email]);

  const handleChange = (index, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });
  };

  const handleImageChange = (index, file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setFields((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value: URL.createObjectURL(file),
        file,
      };
      return updated;
    });
  };


  const handleSave = async () => {
    try {
      const formData = new FormData();
      const socialLinks = {};

      fields.forEach((field) => {
        if (field.key === "profileImage" && field.file) {
          formData.append("profileImage", field.file);
        } else if (
          ["facebook", "instagram", "linkedin", "twitter", "github", "website"].includes(
            field.key
          )
        ) {
          if (field.value) socialLinks[field.key] = field.value;
        } else if (field.key !== "email" && field.key !== "profileImage") {
          formData.append(field.key, field.value || "");
        }
      });
      formData.append("socialLinks", JSON.stringify(socialLinks));
      await updateProfile(formData);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-end gap-2">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-green-600 hover:bg-green-50 disabled:opacity-60"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <X size={16} /> Cancel
            </button>
          </>
        )}
      </div>

      <h2 className="mb-4 font-semibold text-gray-800">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, idx) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              <label className="block text-sm text-gray-500 mb-1">
                {field.label}
              </label>

              {field.type === "image" ? (
                <div className="flex items-center gap-4">
                  <img
                    src={field.value || "https://prourls.link/9hrWiS"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  {editMode && (
                    <label className="text-sm text-blue-600 cursor-pointer">
                      Change
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(idx, e.target.files[0])
                        }
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div className="relative">
                  {Icon && (
                    <Icon
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  )}
                  <input
                    type="text"
                    value={field.value}
                    readOnly={!editMode || field.key === "email"}
                    onChange={(e) =>
                      handleChange(idx, e.target.value)
                    }
                    className={`w-full rounded-md border px-3 py-2 text-sm ${
                      Icon ? "pl-9" : ""
                    } ${
                      editMode && field.key !== "email"
                        ? "bg-white"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
