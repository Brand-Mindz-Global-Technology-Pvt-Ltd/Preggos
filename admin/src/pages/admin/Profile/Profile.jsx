

import ProfileCard from "./ProfileCard";
import InfoSection from "./InfoSection";
import { ProfileProvider } from "../../../context/ProfileContext";

export default function Profile() {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-slate-100 p-4 sm:p-2">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 self-start">
            <ProfileCard title="Preview"  />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 h-[calc(100vh-3rem)] overflow-y-auto space-y-6 pr-2">
            <InfoSection title="Personal Information" />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}


