import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

import InputCard from "../FormCard";
import api from "../../api/axios.js";

const CourseDetails = ({ register, errors }) => {

 const { districtKey, collegeSlug } = useParams();

const [courses, setCourses] = useState([]);

useEffect(() => {

  const fetchCourses = async () => {
    try {

      const res = await api.get(
        `/college/view/${districtKey}/${collegeSlug}`
      );

      setCourses(res.data.courses || []);

    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  if (districtKey && collegeSlug) {
    fetchCourses();
  }

}, [districtKey, collegeSlug]);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Stream / Specialization */}
      <div className="relative">
        <FaBookOpen className="absolute left-3 top-4 text-gray-400" />

        <select
  {...register("stream", { required: "Stream / Specialization is required" })}
  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white"
>
  <option value="">Select Stream / Specialization</option>

  {courses.length === 0 ? (
    <option disabled>No courses available</option>
  ) : (
    courses.map((course) => (
      <option key={course._id} value={course.name}>
        {course.name}
      </option>
    ))
  )}
</select>

        {errors.stream && (
          <p className="text-red-500 text-sm mt-1">{errors.stream.message}</p>
        )}
      </div>

      {/* Study Mode */}
      <div className="relative">
  <FaBookOpen className="absolute left-3 top-4 text-gray-400" />

  <select
    {...register("studyMode", { required: "Mode of study is required" })}
    className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white"
  >
    <option value="">Select Mode of Study</option>
    <option value="Regular">Regular</option>
    <option value="Distance">Distance</option>
    {/* <option value="Online">Online</option> */}
  </select>

  {errors.studyMode && (
    <p className="text-red-500 text-sm mt-1">
      {errors.studyMode.message}
    </p>
  )}
</div>

      {/* Optional */}
      <InputCard
        name="examName"
        placeholder="Entrance Exam Name (Optional)"
        icon={FaBookOpen}
        register={register}
      />

      <InputCard
        name="examRoll"
        placeholder="Exam Roll Number"
        icon={FaBookOpen}
        register={register}
        error={errors.examRoll}
        rules={{
          pattern: {
            value: /^[A-Za-z0-9-]+$/,
            message: "Enter a valid roll number",
          },
        }}
      />

      <InputCard
        name="examScore"
        placeholder="Score / Rank"
        icon={FaBookOpen}
        register={register}
        error={errors.examScore}
        rules={{
          pattern: {
            value: /^[0-9]+$/,
            message: "Enter numbers only",
          },
        }}
      />
    </div>
  );
};

export default CourseDetails;