import { FaSchool, FaBook } from "react-icons/fa";
import InputCard from "../FormCard";

const AcademicDetails = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputCard
        name="previousInstitute"
        placeholder="Previous School / College Name"
        icon={FaSchool}
        register={register}
        error={errors.previousInstitute}
        rules={{ required: "Previous institute name is required" }}
      />

      <InputCard
        name="board"
        placeholder="Board / University"
        icon={FaSchool}
        register={register}
        error={errors.board}
        rules={{ required: "Board / University is required" }}
      />

      <InputCard
        name="rollNumber"
        placeholder="Roll / Registration Number"
        icon={FaBook}
        register={register}
        error={errors.rollNumber}
        rules={{ required: "Roll / Registration number is required" }}
      />

      <InputCard
        name="yearOfPassing"
        placeholder="Year of Passing"
        icon={FaBook}
        register={register}
        error={errors.yearOfPassing}
        rules={{
          required: "Year of passing is required",
          pattern: {
            value: /^(19|20)\d{2}$/,
            message: "Enter a valid year (e.g. 2023)",
          },
        }}
      />

      <InputCard
        name="subjects"
        placeholder="Subjects Studied"
        icon={FaBook}
        register={register}
        error={errors.subjects}
        rules={{ required: "Subjects studied are required" }}
      />

      <InputCard
        name="marks"
        placeholder="Marks / CGPA"
        icon={FaBook}
        register={register}
        error={errors.marks}
        rules={{
          required: "Marks or CGPA is required",
        }}
      />

      <InputCard
        name="percentage"
        placeholder="Percentage / Grade"
        icon={FaBook}
        register={register}
        error={errors.percentage}
        rules={{
          required: "Percentage or grade is required",
          pattern: {
            value: /^[0-9]+(\.[0-9]+)?$/,
            message: "Enter a valid percentage or number",
          },
        }}
      />
    </div>
  );
};

export default AcademicDetails;