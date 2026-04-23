export const Header = ({header, className}:{header:string, className?:string}) => {
    return <h3 className={`font-bold text-3xl ${className}`}>{header}</h3>
}

export const Title = ({title, className}:{title:string, className?:string}) => {
    return <h4 className={`text-xl font-semibold ${className}`}>{title}</h4>
}