import Image from "next/image"

export const PlayerResults = ({className}:{className?:string}) => {
    return (
        <div className={`p-3 ${className}`}>
            <div className="flex justify-center flex-wrap gap-5">
                {[1, 2, 3, 4, 5].map(i => <ResultProfile className="" key={i} />)}
            </div>
        </div>
    )
}

const ResultProfile = ({className}:{className?:string}) => {
    return (
        <div className={` ${className}`}>
            <div>
                <Image src={"/default.avif"} alt="Profile Photo" width={100} height={100} className="rounded-full" />
                <div className="text-center mt-3">Name</div>
            </div>
        </div>
    )
}