import { useFormContext } from "react-hook-form";

const RadioButtonGroup = ({ name, label, options = [], onChangeExternal }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {label && <p className="text-base font-medium mb-2">{label}</p>}
      {options.map((option) => {
        const { onChange, ...restRegister } = register(name);

        const handleChange = (e) => {
          onChange(e); // update react-hook-form
          if (onChangeExternal) onChangeExternal(e.target.value); // update external state
        };

        return (
          <label
            key={option}
            className="flex items-center gap-x-2 cursor-pointer mb-1"
          >
            <input
              type="radio"
              value={option}
              {...restRegister}
              onChange={handleChange}
              className={`w-4 h-4 accent-primary border border-adjust rounded ${
                errors[name] ? "border-error-dark" : ""
              }`}
            />
            <span className="text-base text-else capitalize">{option}</span>
          </label>
        );
      })}
      {errors[name] && (
        <p className="text-sm text-error-dark animate-ghostIn mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonGroup;
