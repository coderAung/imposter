import { forwardRef, InputHTMLAttributes } from "react";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    variant?: "green" | "purple"
}

const variants = {
    "green": "border-green-400/80",
    "purple": "border-green-400/80"
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({label, className, id, variant="purple", ...props}, ref) => {
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={id} className="font-semibold block mb-2">{label}</label>}
            <input id={id} ref={ref} className={`font-semibold w-full p-2 border-2 ${variants[variant]} outline-0 rounded tracking-widest`} {...props} />
        </div>
    );
});

AppInput.displayName = "AppInput"