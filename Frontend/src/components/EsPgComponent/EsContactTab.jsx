import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiClock,
} from "react-icons/fi";

const EsContactTab = ({ establishment }) => {

  const contactItems = [
    {
      label: "Address",
      value: establishment?.address?.fullAddress,
      icon: <FiMapPin />,
    },
    {
      label: "Phone",
      value:
        establishment?.contact?.phone ||
        establishment?.mobile,
      icon: <FiPhone />,
    },
    {
      label: "Email",
      value:
        establishment?.contact?.email ||
        establishment?.email,
      icon: <FiMail />,
    },
    {
      label: "Website",
      value: establishment?.contact?.website,
      icon: <FiGlobe />,
    },
    {
      label: "Working Hours",
      value: establishment?.contact?.workingHours,
      icon: <FiClock />,
    },
  ].filter((item) => item.value);

  if (!contactItems.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Contact Information Not Available
        </h3>
        <p className="text-gray-500 mt-2 text-sm">
          Contact details will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-14 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {contactItems.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >

            {/* ORANGE ICON BADGE */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl text-white text-lg bg-gradient-to-b from-orange-400 to-orange-600 shadow-md">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-900 mt-6">
              {item.label}
            </h3>

            {/* VALUE */}
            <p className="text-gray-600 mt-2 break-words">
              {item.value}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default EsContactTab;