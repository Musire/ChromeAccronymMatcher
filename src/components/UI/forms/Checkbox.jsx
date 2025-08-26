import { useFormContext } from "react-hook-form";

const Checkbox = ({ label, name, onChangeExternal, ...inputProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // register returns { onChange, onBlur, ref, name }
  // We'll wrap onChange to call external too

  const { onChange, ...restRegister } = register(name);

  const handleChange = (e) => {
    onChange(e); // update react-hook-form
    if (onChangeExternal) onChangeExternal(e.target.checked); // update external state if provided
  };

  return (
    <div className="mb-2">
      <label className="flex items-center gap-x-2 cursor-pointer">
        <input
          type="checkbox"
          {...restRegister}
          onChange={handleChange}
          className={`w-4 h-4 accent-primary border border-adjust rounded ${
            errors[name] ? "border-error-dark" : ""
          }`}
          {...inputProps}
        />
        <span className="text-base text-else capitalize">{label}</span>
      </label>
      {errors[name] && (
        <p className="text-sm text-error-dark animate-ghostIn mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
