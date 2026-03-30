import { Menu, Bell, LogOut, Settings, User } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function TopNavbar({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const context = useContext(NotificationContext) || {};
  const {
    notifications = [],
    unreadCount = 0,
    markAllAsRead = () => {},
  } = context;

  const menuRef = useRef(null);
  const notifyRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }

      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="h-16 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={async () => {
              const newState = !notifyOpen;
              setNotifyOpen(newState);

              if (newState && unreadCount > 0) {
                await markAllAsRead();
              }
            }}
            className="relative p-2 rounded-xl hover:bg-gray-100"
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {notifyOpen && (
            <>
              {/* Mobile Overlay */}
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden z-40"
                onClick={() => setNotifyOpen(false)}
              />

              {/* Mobile Drawer */}
              <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl p-5 space-y-3 sm:hidden z-50 animate-slide-in">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>

                  <button
                    onClick={() => setNotifyOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No new notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`p-3 rounded-xl ${
                        notif.isRead
                          ? "bg-gray-50"
                          : "bg-blue-50 border border-blue-100"
                      }`}
                    >
                      <p className="text-sm font-medium wrap-break-word">
                        {notif.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop Dropdown */}
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl p-4 space-y-3 max-h-96 overflow-y-auto hidden sm:block z-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>

                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No new notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`p-3 rounded-xl ${
                        notif.isRead
                          ? "bg-gray-50"
                          : "bg-blue-50 border border-blue-100"
                      }`}
                    >
                      <p className="text-sm font-medium wrap-break-word">
                        {notif.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
