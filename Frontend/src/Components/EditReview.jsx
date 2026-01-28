import React, { useState } from "react";
import { Star, X } from "lucide-react";

const EditReview = ({ review, onClose, onSuccess }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const updateReview = async () => {
    setLoading(true);

    await fetch(`http://localhost:5000/api/reviews/${review._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ rating, comment }),
    });

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Edit Review</h3>

        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={22}
              onClick={() => setRating(s)}
              className={`cursor-pointer ${
                s <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          rows="4"
          className="w-full border rounded-lg px-3 py-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={updateReview}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Update Review"}
        </button>
      </div>
    </div>
  );
};

export default EditReview;
