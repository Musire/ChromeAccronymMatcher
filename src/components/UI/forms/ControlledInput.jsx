import { Controller, useFormContext } from 'react-hook-form';
import React from "react";

const ControlledInput = ({ label, name, children }) => {
    const { control, formState: { errors } } = useFormContext();

    return ( 
        <div className="flex flex-col w-full gap-y-2">
            <legend className="w-full text-emphasis text-lg capitalize mb-1">{label}</legend>
            <Controller
                name={name}
                control={control}  
                render={({ field }) =>
                    React.cloneElement(children, { ...field, name })
                }
            />
            {errors[name] && (
                <p className="text-sm relative text-error-dark snappy animate-ghostIn mb-2">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
}

export default ControlledInput;
