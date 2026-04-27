type Variant = "red" | "blue" | "green" | "purple" | "gray"

const variants = {
    red: "",
    blue: "border-blue-400 bg-blue-700/20",
    green: "",
    gray: "border-gray-400 bg-gray-700/20",
    purple: "border-purple-500 bg-purple-800/20",
}

export const AppCard = ({className, variant = "blue", children}: {className?:string, variant?:Variant, children?:React.ReactNode}) => {
    return (
        <div className={`border-s-4 ${variants[variant]} ${className} p-3`}>{children}</div>
    )
}