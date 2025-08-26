    import { Button, CheckBox, SelectButton } from "@/components";
    import { calculateEnd, isOverlapping } from "@/util/time";
    import { useState } from "react";

    const AvailabilityTracker = ({ name, value = [], onChange }) => {
        const [start, setStart] = useState(null);
        const [duration, setDuration] = useState(null);
        const [error, setError] = useState(null);
        const unavailable = Array.isArray(value) && value[0] === "unavailable";

        const handleCheckbox = (checked) => {
            if (checked) {
                onChange(["unavailable"]);
            } else {
                onChange([]); // clear
            }
        };

        const updateCaptured = () => {
            if (!start || !duration) return;

            const newBlock = calculateEnd(start, duration);

            if (value.some(existing => isOverlapping(existing, newBlock))) {
                setError({ message: "Overlapping block with previously captured." });
            } else {
                setError(null);
                onChange([...value, newBlock]);
            }
        };

        console.log(name)

        return (
            <div className="mt-4 grid grid-cols-3 gap-4">
                {unavailable && (
                    <CheckBox 
                        label="Unavailable"
                        name={`unavailable-${name}`}
                        onChangeExternal={handleCheckbox}
                    />
                )}

                {!unavailable && (
                    <>
                        <SelectButton
                            label="start time"
                            externalState={start}
                            externalSetter={setStart}
                            buttonStyle="w-full rounded-full" 
                            options={["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"]} 
                        />
                        <SelectButton
                            label="duration"
                            externalState={duration}
                            externalSetter={setDuration}
                            buttonStyle="w-full rounded-full" 
                            options={[4, 5, 6, 7, 8, 9, 10]} 
                        />
                        <div className="flex flex-col space-y-2">
                            <p className="text-else capitalize">candidate</p>
                            <p className="">{start && duration && calculateEnd(start, duration)}</p>
                        </div>
                        <div className="flex flex-col space-y-2 col-span-3">
                            <h3 className="capitalize">captured</h3>
                            <div className="surface-2 w-full h-20 p-4 text-xs">
                                {Array.isArray(value) ? value.join(", ") : value}
                            </div>
                        </div>
                        {error && (
                            <p className="text-error dark:text-error-dark col-span-2">
                                {error.message}
                            </p>
                        )}
                        <span className="spaced col-span-full ">
                            <CheckBox 
                                label="Unavailable"
                                name={`unavailable-${name}`}
                                onChangeExternal={handleCheckbox}
                            />
                            <Button 
                                action={updateCaptured} 
                                className="w-20 surface-2 rounded-full hover:surface-3"
                            >
                                append
                            </Button>
                        </span>
                    </>
                )}
            </div>
        );
    };

    export default AvailabilityTracker;
