import React, { useState } from "react";
import CompanySetting from "./CompanySetting.jsx";
import TermsSettings from "./Termssettings.jsx";
import PrivacySettings from "./Privacysettings.jsx";
import CookieSettings from "./Cookiesettings.jsx";
import { Cookie, GlobeLock } from "lucide-react"

const Setting = () => {
  const [active, setActive] = useState(null);

  const toggleSection = (section) => {
    setActive(active === section ? null : section);
  };

  const sections = [
    {
      id: "company",
      title: "Company Settings",
      description: "Manage your company profile and preferences",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      component: <CompanySetting />
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      description: "Manage your platform's terms and legal agreement",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      component: <TermsSettings />
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "Manage data protection and privacy policies",
      icon: <GlobeLock />,
      component: <PrivacySettings />
    },
    {
      id: "cookie-policy",
      title: "Cookie Policy",
      description: "Configure and manage website cookie policies",
      icon: <Cookie />,
      component: <CookieSettings />
    }
  ];

  return (
    <div className="min-h-screen bg-white rounded-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-8 lg:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Settings
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your account preferences and configurations
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-2 sm:space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${active === section.id
                ? "border-blue-200 ring-2 ring-blue-100"
                : "border-gray-200 hover:border-gray-300"
                }`}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 sm:px-6 lg:px-7 py-5 sm:py-6 text-left group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${active === section.id
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                  >
                    {section.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-base sm:text-lg font-semibold transition-colors duration-200 truncate ${active === section.id
                        ? "text-blue-700"
                        : "text-gray-900 group-hover:text-gray-700"
                        }`}
                    >
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Chevron Icon */}
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${active === section.id
                      ? "rotate-180 text-blue-500"
                      : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Section Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${active === section.id
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
                  } overflow-hidden`}
              >
                <div className="px-5 sm:px-6 lg:px-7 pb-6 pt-2">
                  <div className="border-t border-gray-100 pt-6">
                    {section.component}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Setting;