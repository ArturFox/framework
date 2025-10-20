import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLElement>{
    name: string;
    label?: string;
    required?: boolean;
}


export const FormInputM = ({name, label, required, ...props}: Props) => {

    const {register, watch, setValue, formState: {errors, isSubmitted}} = useFormContext();

    const text = watch(name) || "";
    

    const errorText = errors?.[name]?.message as string;

    const e = required && isSubmitted && !text.trim();

    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true});
    };

    return(
        <div>

            {label && (
                <p>
                    {label} {e && <span className="text-red-500">*</span>}
                </p>
            )}

            <div className="relative w-full">
                <Input 
                    {...register(name)} 
                    {...props} 
                    className="pr-8" 
                />
                {Boolean(text) && 
                    <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                        onClick={() => onClickClear()}
                    >
                        x
                    </button>
                }
            </div>

            {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
        </div>
    )
}