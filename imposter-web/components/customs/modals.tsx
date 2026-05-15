"use client"

import { X } from "lucide-react";
import { AppButton } from "./buttons";
import { createContext, useContext, useState } from "react";

type AppModalContextType = {
    open:boolean,
    close?:() => void
}

const AppModalContext = createContext<AppModalContextType>({
    open: false,
})

const useAppModal = () => {
    const context = useContext(AppModalContext)
    if (!context) throw new Error("useAppModal must be used within an AppModalProvider")
    return context
}

export const AppModal = ({ open, close, children }: { children?: React.ReactNode, open:boolean, close?:() => void}) => {
    return (
        <AppModalContext.Provider value={{
            open, close
        }}>
            <div onClick={close} className={`p-5 fixed inset-0 backdrop-blur justify-center ${open ? 'flex' : 'hidden'}`}>
                {children}
            </div>
        </AppModalContext.Provider>
    )
}

AppModal.Dialog = function Dialog({children, className}: {children:React.ReactNode, className?:string}) {
    return (
        <div className={className || `w-[95%] md:w-1/3`}>
            <div onClick={e => e.stopPropagation()} className="rounded-2xl p-3 pb-5 backdrop-blur-xl border-2 border-green-500 bg-green-500/10">
                {children}
            </div>    
        </div>
    )
}

AppModal.Header = function Header({children}: {children:React.ReactNode}) {
    const {close} = useAppModal()

    return (
        <div className="mb-3 flex justify-between items-center">
            {children}
            {close && <AppButton className="rounded-full" variant="ghost" color="green" onClick={close}><X /></AppButton>}
        </div>
    )
}

AppModal.Body = function Body({children}:{children:React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}

AppModal.Footer = function Footer({children}:{children:React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}