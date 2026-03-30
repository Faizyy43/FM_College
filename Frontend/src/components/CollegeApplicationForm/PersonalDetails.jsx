import { FaUser, FaCalendarAlt, FaFlag, FaIdCard } from "react-icons/fa";
import InputCard from "../FormCard";

const PersonalDetails = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputCard
        name="fullName"
        placeholder="Full Name"
        icon={FaUser}
        register={register}
        error={errors.fullName}
        rules={{ required: "Full name is required" }}
      />

      <InputCard
        name="dob"
        placeholder="Date of Birth"
        type="date"
        icon={FaCalendarAlt}
        register={register}
        error={errors.dob}
        rules={{ required: "Date of birth is required" }}
      />

      <InputCard
        name="gender"
        placeholder="Gender"
        icon={FaUser}
        register={register}
        error={errors.gender}
        rules={{ required: "Gender is required" }}
      />

      <InputCard
        name="nationality"
        placeholder="Nationality"
        icon={FaFlag}
        register={register}
        error={errors.nationality}
        rules={{ required: "Nationality is required" }}
      />

      {/* Optional Field */}
      <InputCard
        name="category"
        placeholder="Category / Caste (Optional)"
        icon={FaUser}
        register={register}
      />

      <InputCard
        name="idNumber"
        placeholder="Aadhaar / Passport Number"
        icon={FaIdCard}
        register={register}
        error={errors.idNumber}
        rules={{
          required: "ID number is required",
          minLength: {
            value: 6,
            message: "ID number must be at least 6 characters",
          },
        }}
      />
    </div>
  );
};

export default PersonalDetails;
