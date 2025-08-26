import { useFormContext } from "react-hook-form";

const TextArea = ({ label, name, ...inputProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <label className="flex flex-col w-full  gap-y-1">
        <span className="w-full text-emphasis capitalize ">{label}</span>
        <textarea
          {...register(name)}
          className={`w-full bg-transparent border border-adjust rounded-lg  focus:outline-none text-base normal-space text-else mb-2 min-h-10 ${
            errors[name] ? "border-error-dark" : ""
          }`}
          {...inputProps}
        />
        {errors[name] && <p className="text-sm relative text-error-dark snappy animate-ghostIn mb-2">{errors[name]?.message}</p>}
      </label>
      
    </div>
  );
};

export default TextArea;
