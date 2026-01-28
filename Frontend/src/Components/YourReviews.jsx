import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Trash2, Pencil } from "lucide-react";
import EditReview from "./EditReview";

const YourReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews");

      if (!res.ok) {
        const text = await res.text();
        console.error("API error:", text);
        return;
      }

      const data = await res.json();

      // ✅ FIX: backend may return array OR {reviews:[]}
      const list = Array.isArray(data) ? data : data.reviews || [];
      setReviews(list);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete API error:", text);
        alert("Delete failed");
        return;
      }

      fetchReviews();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-50">
          <MessageSquare className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Your Feedback & Suggestions
        </h2>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading your reviews...</p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-sm text-gray-500">
          You haven’t shared any feedback yet.
        </p>
      )}

      {!loading && reviews.length > 0 && (
        <div className="space-y-5">
          {reviews.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">
                  {item.college?.name || item.college || "College Review"}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {item.status || "Pending"}
                </span>
              </div>

              {/* RATING */}
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= (item.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-gray-600 mt-3">
                {item.comment || "—"}
              </p>

              {/* DATE */}
              <p className="text-xs text-gray-400 mt-2">
                Submitted on{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setEditReview(item)}
                  className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                >
                  <Pencil size={14} /> Edit
                </button>

                <button
                  onClick={() => deleteReview(item._id)}
                  className="flex items-center gap-1 text-red-600 text-sm hover:underline"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editReview && (
        <EditReview
          review={editReview}
          onClose={() => setEditReview(null)}
          onSuccess={fetchReviews}
        />
      )}
    </section>
  );
};

export default YourReviews;
