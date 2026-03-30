export default function StudentNotifications() {
  const notifications = [
    "Application submitted successfully",
    "Documents verified",
    "Application under review",
  ];

  return (
    <div className="absolute right-0 sm:right-0 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 mt-3 w-[92vw] sm:w-80 max-w-sm bg-white rounded-2xl shadow-xl p-4 space-y-3 max-h-96 overflow-y-auto z-50">
      <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
        Notifications
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {notifications.map((note, i) => (
          <div
            key={i}
            className="border border-gray-200 p-3 rounded-lg text-sm sm:text-base wrap-break-word bg-gray-50"
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}
