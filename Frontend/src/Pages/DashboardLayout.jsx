import React, { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import ProfilePage1 from "../Components/ProfilePage";
import AppliedColleges from "../Components/AppliedColleges";
import YourReviews from "../Components/YourReviews";
import AppliedCAF from "../Components/AppliedCAF";
import PendingApplications from "../Components/PendingApplications";
import AccountSettings from "../Components/AccountSettings";
import ProfileViews from "../Components/ProfileViews";
import CollegeDetails from "../Components/CollegeDetails";

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("Your Profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔹 mobile
  const [profileResetKey, setProfileResetKey] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // 🔹 USER STATE (single source of truth)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // 🔹 SAFE INITIALS
  const getInitials = (name = "") => {
    if (!name.trim()) return "?";
    const words = name.trim().split(/\s+/);
    return words.length === 1
      ? words[0][0].toUpperCase()
      : words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };

  /* ================= LOAD PROFILE + IMAGE ON REFRESH ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile/get", {
          method: "POST",
        });

        const data = await res.json();

        if (data) {
          // keep your old logic
          if (data.name) {
            setProfileData({
              name: data.name || "",
              email: data.email || "",
            });
          }

          // ✅ IMPORTANT: load saved profileImage from MongoDB
          setProfileImage(data?.profileImage || null);
        }
      } catch (err) {
        console.log("Profile load error:", err);
      }
    };

    loadProfile();
  }, []);

  /* ================= UPLOAD PROFILE IMAGE (SAVE IN DB) ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // optional: show instantly as preview (no harm)
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);

      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await fetch(
        "http://localhost:5000/api/profile/upload-image",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Upload failed:", data);
        alert(data?.message || "Image upload failed");
        return;
      }

      // ✅ set image URL saved in MongoDB (this persists after refresh)
      if (data?.imageUrl) {
        setProfileImage(data.imageUrl);
      }
    } catch (err) {
      console.log("Upload error:", err);
      alert("Image upload failed");
    }
  };

  // 🔹 LOGOUT HANDLER
  const handleLogout = () => {
    setIsLoggedOut(true); // 🔥 important
    setProfileData({ name: "", email: "" });
    setProfileImage(null);
    setProfileResetKey((prev) => prev + 1);
    setSelectedMenu("Your Profile");
    setShowLogoutModal(false);
  };

  return (
    <div className="flex w-screen h-screen bg-white overflow-hidden">
      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed lg:static z-50 h-full transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          profileData={profileData}
          profileImage={profileImage}
          getInitials={getInitials}
          onImageUpload={handleImageUpload} // ✅ FIXED (save in MongoDB)
          selectedMenu={selectedMenu}
          setSelectedMenu={(menu) => {
            setSelectedMenu(menu);
            setSidebarOpen(false); // close on mobile click
          }}
          onLogoutClick={() => setShowLogoutModal(true)}
        />
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOP BAR (MOBILE) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <h2 className="font-semibold text-gray-800">{selectedMenu}</h2>

          <button onClick={() => setShowLogoutModal(true)}>
            <LogOut size={20} className="text-red-600" />
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {selectedMenu === "Your Profile" && (
            <ProfilePage1
              key={profileResetKey}
              resetKey={profileResetKey}
              isLoggedOut={isLoggedOut} // 🔥 pass this
              setProfileData={setProfileData}
            />
          )}

          {selectedMenu === "Applied Colleges" && (
            <AppliedColleges
              onViewDetails={(application) => {
                setSelectedApplication(application);
                setSelectedMenu("College Details");
              }}
            />
          )}

          {selectedMenu === "College Details" && selectedApplication && (
            <CollegeDetails
              application={selectedApplication}
              onBack={() => setSelectedMenu("Applied Colleges")}
            />
          )}

          {/* {selectedMenu === "Your Reviews" && <YourReviews />}
          {selectedMenu === "Applied CAF" && <AppliedCAF />}
          {selectedMenu === "Pending Application" && <PendingApplications />}
          {selectedMenu === "Account Settings" && <AccountSettings />} */}
          {selectedMenu === "Profile Views" && <ProfileViews />}
        </main>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <LogOut className="h-7 w-7 text-red-600" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-center">
              Log out of your account?
            </h3>

            <p className="mt-2 text-sm text-center text-gray-500">
              You’ll be signed out and all data will be cleared.
            </p>

            <div className="mt-6 sm:mt-8 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm text-white hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
