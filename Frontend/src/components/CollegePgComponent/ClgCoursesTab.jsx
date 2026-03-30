import React from "react";

const ClgCoursesTab = ({ courses }) => {

  if (!courses?.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          No Courses Available
        </h3>

        <p className="text-gray-500 mt-2 text-sm">
          Courses will appear here once the college adds them.
        </p>
      </div>
    );
  }

  return (
    <div className="py-14 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {courses.map((course) => (

          <div
            key={course._id}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >

            {/* TITLE */}
            <h3 className="text-xl font-semibold text-gray-900">
              {course.name}
            </h3>

            {/* DETAILS */}
            <div className="mt-6 space-y-4">

              {/* SEMESTERS */}
              <div>
                <p className="text-sm text-gray-500">Semesters</p>

                <p className="font-medium text-gray-800">
                  {course.semesters} Semesters
                </p>
              </div>

              {/* TOTAL SEATS */}
              <div>
                <p className="text-sm text-gray-500">Total Seats</p>

                <p className="font-medium text-gray-800">
                  {course.totalSeats}
                </p>
              </div>

              {/* AVAILABLE SEATS */}
              <div>
                <p className="text-sm text-gray-500">Available Seats</p>

                <p className="font-medium text-green-600">
                  {course.availableSeats}
                </p>
              </div>

            </div>

            {/* FEES */}
            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Course Fees
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                ₹{course.fees?.toLocaleString() || 0}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ClgCoursesTab;