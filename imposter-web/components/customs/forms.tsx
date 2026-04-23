import { forwardRef, InputHTMLAttributes } from "react";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({label, className, id, ...props}, ref) => {
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={id} className="font-semibold block mb-2">{label}</label>}
            <input id={id} ref={ref} className="font-semibold w-full p-2 border-2 outline-0 rounded tracking-widest" {...props} />
        </div>
    );
});

AppInput.displayName = "AppInput"