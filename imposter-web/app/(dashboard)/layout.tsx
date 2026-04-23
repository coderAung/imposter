import { AppButton } from "@/components/customs/buttons";
import { Gamepad2, Home, Settings, UserRound, UsersRoundIcon } from "lucide-react";
import React from "react";

export default function DashboardLayout({children}: {children:React.ReactNode}) {
    return (
        <>
            <div className="pb-20">
                {children}
            </div>
            <StickyMenu />
        </>
    )
}

const StickyMenu = () => {
    return (
        <div className="fixed bottom-2 w-full px-3 md:hidden">
            <div className="rounded-2xl bg-blue-300/20 backdrop-blur-lg px-2 py-5">
                <div className="grid grid-cols-5 gap-y-2">
                    <StickyMenuItem><Home /></StickyMenuItem>
                    <StickyMenuItem><UsersRoundIcon /></StickyMenuItem>

                    <StickyMenuItem className="">
                        <AppButton variant="ghost" className="rounded-full absolute p-4 -top-3 bg-blue-400 text-blue-700"><Gamepad2 size={"2.2rem"} /></AppButton>
                    </StickyMenuItem>

                    <StickyMenuItem><Settings /></StickyMenuItem>
                    <StickyMenuItem><UserRound /></StickyMenuItem>
                </div>
            </div>
        </div>
    )
}

const StickyMenuItem = ({children, className}: {children:React.ReactNode, className?:string}) => {
    return <div className={`flex justify-center items-center ${className}`}>{children}</div>

}
