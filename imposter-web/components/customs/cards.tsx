type Variant = "red" | "blue" | "green" | "purple"

const variants = {
    red: "",
    blue: "border-blue-400 bg-blue-700/20",
    green: "",
    purple: "border-purple-500 bg-purple-800/20",
}

export const AppCard = ({className, variant = "blue", children}: {className?:string, variant?:Variant, children?:React.ReactNode}) => {
    return (
        <div className={`border-s-4 ${variants[variant]} ${className} p-3`}>{children}</div>
    )
}