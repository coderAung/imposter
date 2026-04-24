import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?:boolean,
    variant?:"primary" | "outline" | "ghost" | "secondary",
}

const variants = {
    primary: "bg-purple-950",
    secondary: "bg-purple-400/20 text-purple-500",
    outline: "border border-purple-500",
    ghost: "",
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({className, variant = "primary", children, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp ref={ref} {...props} className={`text-center rounded p-1 font-semibold cursor-pointer tracking-wider ${variants[variant]} ${className}`}>{children}</Comp>
    )
})

AppButton.displayName = "AppButton"