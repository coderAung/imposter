import { ButtonHTMLAttributes, forwardRef } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:"primary" | "outline" | "ghost" | "secondary"
}

const variants = {
    primary: "bg-purple-950",
    secondary: "bg-purple-400/20 text-purple-500",
    outline: "border border-purple-500",
    ghost: "",
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({className, variant = "primary", children, ...props}, ref) => {
    return (
        <button ref={ref} {...props} className={ `rounded p-2 font-semibold cursor-pointer ${variants[variant]} ${className}`}>{children}</button>
    )
})

AppButton.displayName = "AppButton"