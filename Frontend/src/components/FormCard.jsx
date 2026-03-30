const InputCard = ({
  name,
  placeholder,
  icon: Icon,
  register,
  error,
  type = "text",
  rules = {},
}) => {
  return (
    <div className="w-full">
      <div
        className={`
          relative flex items-center
          h-13.5
          rounded-xl
          bg-gray-50
          border
          px-4
          transition-all duration-200
          ${error ? "border-red-400" : "border-gray-200"}
          focus-within:border-indigo-500
          focus-within:bg-white
          focus-within:ring-2
          focus-within:ring-indigo-100
        `}
      >
        {/* Icon */}
        {Icon && (
          <Icon className="text-gray-400 text-lg mr-3 shrink-0" />
        )}

        {/* Input */}
        <input
          type={type}
          {...(register ? register(name, rules) : {})}
          placeholder={placeholder}
          className="
            w-full
            bg-transparent
            outline-none
            text-sm
            text-gray-800
            placeholder-gray-400
          "
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputCard;