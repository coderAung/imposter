import { AppButton } from "@/components/customs/buttons";
import { Header } from "@/components/customs/fonts";
import { Slot } from "@radix-ui/react-slot";
import { Gamepad2, Home, Menu, Search, Settings, UserRound, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({children}: {children:React.ReactNode}) {
    return (
        <>
            <div className="md:w-1/2 md:mx-auto md:mt-2 md:rounded py-3 px-3 items-center flex justify-between mb-4 sticky top-0 backdrop-blur-3xl">
                <Header header="Imposter"/>
                <div className="flex gap-x-4">
                    <Search />
                    <div className="hidden md:flex">
                        <Menu />
                    </div>
                </div>
            </div>

            <div className="pb-20 md:w-1/2 md:mx-auto md:p-0">
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
                    <StickyMenuItem asChild><Link href={"/home"}><Home /></Link></StickyMenuItem>
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

const StickyMenuItem = ({children, className, asChild = false}: {children:React.ReactNode, className?:string, asChild?:boolean}) => {
    const Comp = asChild ? Slot : "div";
    return <Comp className={`flex justify-center items-center ${className}`}>{children}</Comp>

}
