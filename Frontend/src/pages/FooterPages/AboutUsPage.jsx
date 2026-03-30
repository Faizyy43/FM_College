import React from "react";
import { FaGraduationCap, FaUsers, FaUniversity } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-50 py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 leading-tight">
              Your Trusted College Directory in India
            </h1>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              We simplify the process of finding, comparing, and choosing colleges by providing 
              accurate, up-to-date information in one trusted platform.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1596496050374-52d4a6206230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students collaborating"
              className="rounded-2xl shadow-xl object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To provide students with a seamless experience for discovering colleges, comparing programs, 
            and making informed decisions for their academic and career goals.
          </p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To become India’s most trusted educational platform, bridging the gap between students 
            and colleges while fostering transparency and confidence in higher education choices.
          </p>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-indigo-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">Who We Serve</h2>
          <p className="text-gray-700 mt-4 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Our platform caters to students, parents, and colleges, providing tools and insights 
            to make informed academic decisions.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 flex flex-col items-center text-center">
            <FaGraduationCap className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">Students</h3>
            <p className="text-gray-700 text-lg">
              Discover, compare, and select programs that match your career goals.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 flex flex-col items-center text-center">
            <FaUsers className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">Parents</h3>
            <p className="text-gray-700 text-lg">
              Access reliable information to guide your child toward the best educational choices.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 flex flex-col items-center text-center">
            <FaUniversity className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">Colleges</h3>
            <p className="text-gray-700 text-lg">
              Showcase your programs and facilities to students seeking accurate, transparent data.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          We are dedicated to continuously updating our platform, improving the quality of college data, 
          and providing trusted guidance for students and parents. Join us in making the journey to 
          higher education more transparent, informed, and seamless.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
