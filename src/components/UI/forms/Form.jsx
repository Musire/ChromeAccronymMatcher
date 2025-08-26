import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";

const Form = ({ initialValues, onSubmit, schema, setParentData, children }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onBlur"
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = methods;

  // Status logic
  const hasErrors = Object.keys(errors).length > 0;
  const showError = !isSubmitting && hasErrors;
  const showSuccess = !isSubmitting && isSubmitSuccessful && !hasErrors;


  useEffect(() => {
    if (!setParentData) return;
    const subscription = methods.watch((values) => {
      setParentData(values);
    });
    return () => subscription.unsubscribe();
  }, [methods, setParentData]);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full h-full space-y-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
        <button
          type="submit"
          disabled={isSubmitting || showSuccess} // disable while submitting or after success
          className={clsx(
            "normal-space capitalize border rounded snappy text-sm font-medium flex items-center justify-center gap-x-2 mt-6 disabled:cursor-not-allowed",
            {
              "primary-color border-adjust": !showError && !showSuccess && !isSubmitting,
              "bg-error-dark border-error-dark text-deep": showError,
              "bg-success-dark border-success-dark text-deep": showSuccess,
            }
          )}
        >
          {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
          {showSuccess && !isSubmitting && <Check className="w-4 h-4" />}

          {isSubmitting
            ? "Submitting..."
            : showError
            ? "Retry"
            : showSuccess
            ? "Success"
            : "Submit"}
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
