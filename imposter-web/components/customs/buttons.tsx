import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?:boolean,
    color?:"green" | "purple",
    variant?:"primary" | "outline" | "ghost" | "secondary"
}

const variants = {
    green: {
        primary: "bg-green-500/20 border-2 border-green-400/50 text-green-400",
        outline: "border-2 border-green-400/50 text-green-500",
        secondary: "bg-green-500/10 text-green-400",
        ghost: "hover:bg-green-500/20 text-green-400",
    },
    purple: {
        primary: "bg-purple-500/20 border-2 border-purple-400/50 text-purple-400",
        outline: "border-2 border-purple-400/50 text-purple-500",
        secondary: "bg-purple-500/10 text-purple-400",
        ghost: "hover:bg-purple-500/20 text-purple-400",
    }
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({className, variant = "primary", color = "purple", children, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp ref={ref} {...props} className={`flex p-2 justify-center items-center rounded font-semibold cursor-pointer tracking-wider ${variants[color][variant]} ${className}`}>{children}</Comp>
    )
})

AppButton.displayName = "AppButton"