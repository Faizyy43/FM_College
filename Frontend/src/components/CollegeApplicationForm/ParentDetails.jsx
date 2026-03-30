import { FaUser, FaPhone, FaBriefcase } from "react-icons/fa";
import InputCard from "../FormCard";

const ParentDetails = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputCard
        name="fatherName"
        placeholder="Father’s Name"
        icon={FaUser}
        register={register}
        error={errors.fatherName}
        rules={{ required: "Father’s name is required" }}
      />

      <InputCard
        name="fatherOccupation"
        placeholder="Father’s Occupation"
        icon={FaBriefcase}
        register={register}
        error={errors.fatherOccupation}
        rules={{ required: "Father’s occupation is required" }}
      />

      <InputCard
        name="motherName"
        placeholder="Mother’s Name"
        icon={FaUser}
        register={register}
        error={errors.motherName}
        rules={{ required: "Mother’s name is required" }}
      />

      <InputCard
        name="motherOccupation"
        placeholder="Mother’s Occupation"
        icon={FaBriefcase}
        register={register}
        error={errors.motherOccupation}
        rules={{ required: "Mother’s occupation is required" }}
      />

      {/* Optional */}
      <InputCard
        name="guardianName"
        placeholder="Guardian Name (Optional)"
        icon={FaUser}
        register={register}
      />

      <InputCard
        name="parentContact"
        placeholder="Parent/Guardian Contact Number"
        icon={FaPhone}
        register={register}
        error={errors.parentContact}
        rules={{
          required: "Parent/Guardian contact number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Enter a valid 10-digit contact number",
          },
        }}
      />

      <InputCard
        name="annualIncome"
        placeholder="Annual Family Income"
        icon={FaUser}
        register={register}
        error={errors.annualIncome}
        rules={{
          required: "Annual family income is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Enter numbers only",
          },
        }}
      />
    </div>
  );
};

export default ParentDetails;
