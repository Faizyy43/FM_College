import React from "react";

const EsCoursesTab = ({ courses }) => {

  if (!courses?.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          No Courses Available
        </h3>
        <p className="text-gray-500 mt-2 text-sm">
          Training programs will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="py-14 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {courses.map((course, index) => (

          <div
            key={course._id}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >

          

            {/* TITLE */}
            <h3 className="text-xl font-semibold text-gray-900">
              {course.title}
            </h3>


            {/* DETAILS */}
            <div className="mt-6 space-y-4">

              {/* DURATION */}
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">
                  {course.duration}
                </p>
              </div>

              {/* MODE */}
              {course.mode?.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Mode</p>
                  <p className="font-medium text-gray-800">
                    {course.mode.join(", ")}
                  </p>
                </div>
              )}

            </div>


            {/* FEES */}
            <div className="mt-6">

              <p className="text-sm text-gray-500">Course Fees</p>

              <p className="text-2xl font-bold text-orange-600">
                ₹{course.fees?.toLocaleString() || 0}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default EsCoursesTab;