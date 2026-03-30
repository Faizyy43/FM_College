const AdminReviewPanel = ({ document, onClose, onReject }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl p-6 z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Review Document
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Document Info */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-gray-700 font-medium mb-4 wrap-break-word">
            {document?.name}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm font-medium">
            Approve
          </button>

          <button
            onClick={onReject}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm font-medium"
          >
            Reject
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 text-left"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default AdminReviewPanel;
