import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import InputCard from "../FormCard";

const ContactDetails = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputCard
        name="permanentAddress"
        placeholder="Permanent Address"
        icon={FaMapMarkerAlt}
        register={register}
        error={errors.permanentAddress}
        rules={{ required: "Permanent address is required" }}
      />

      <InputCard
        name="currentAddress"
        placeholder="Current Address"
        icon={FaMapMarkerAlt}
        register={register}
        error={errors.currentAddress}
        rules={{ required: "Current address is required" }}
      />

      <InputCard
        name="mobile"
        placeholder="Mobile Number"
        icon={FaPhone}
        register={register}
        error={errors.mobile}
        rules={{
          required: "Mobile number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Enter a valid 10-digit mobile number",
          },
        }}
      />

      <InputCard
        name="email"
        placeholder="Email ID"
        type="email"
        icon={FaEnvelope}
        register={register}
        error={errors.email}
        rules={{
          required: "Email address is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address",
          },
        }}
      />
    </div>
  );
};

export default ContactDetails;