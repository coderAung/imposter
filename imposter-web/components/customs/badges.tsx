import React from "react"

const variants = {
    blue: "text-blue-500 bg-blue-600/30",
    red: "text-red-500 bg-red-600/30",
    green: "text-green-500 bg-green-500/30",
    yellow: "text-yellow-500 bg-yellow-500/30",
    purple: "text-purple-400 bg-purple-500/20",
}

export const AppBadge = ({className, children, variant = "blue"}: {className?:string, children:React.ReactNode, variant?:"blue" | "red" | "yellow" | "green" | "purple"}) => {
    return <span className={`${variants[variant]} text-sm py-0.5 font-semibold rounded-3xl px-4 tracking-wider ${className}`}>{children}</span>
}