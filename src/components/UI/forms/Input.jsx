import { useFormContext } from "react-hook-form";

const FormField = ({ label, name, ...inputProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <label className="flex flex-col w-full space-y-1">
        <span className="w-full capitalize text-emphasis text-lg ">{label}</span>
        <input
          {...register(name)}
          className={`w-full bg-transparent border border-adjust rounded-lg  focus:outline-none text-base normal-space text-else ${
            errors[name] ? "border-error-dark snappy" : ""
          }`}
          {...inputProps}
        />
        <p className={`text-sm relative text-error-dark snappy  h-4 ${errors[name] ? "visible animate-ghostIn" : "invisible"}`}>{errors[name]?.message}</p>
      </label>
      
    </div>
  );
};

export default FormField

