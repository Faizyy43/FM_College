import Review from "../models/Review.js";

// ✅ CREATE REVIEW
export const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const review = await Review.create({
      name,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL REVIEWS
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
