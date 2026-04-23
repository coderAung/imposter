export default function HomeLayout({children}: {children:React.ReactNode}) {
    return (
        <div className="md:p-3 md:flex md:justify-center">
            {children}
        </div>
    )
}