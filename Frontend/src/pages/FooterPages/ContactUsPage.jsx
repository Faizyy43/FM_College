import React, { useState } from "react";

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-12">
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full relative rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1596496050374-52d4a6206230?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-black/20 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-semibold text-center px-4">
              Let’s Connect! <br /> We’re Here to Help.
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8 text-base md:text-lg">
            Have a question, suggestion, or need help? Fill out the form below,
            and our team will get back to you promptly.
          </p>

          <form
            className="space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          <p className="mt-6 text-gray-400 text-sm md:text-base">
            We respect your privacy. Your information will never be shared with
            third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
