"use client"

import { AppButton } from "@/components/customs/buttons"
import { Title } from "@/components/customs/fonts"
import { AppInput } from "@/components/customs/forms"
import { useRouter } from "next/navigation"

export default function SignUp() {
    const router = useRouter()
    return (
        <div className="rounded w-full md:w-1/3 mt-4 p-3">
            <Title title="Imposter Game - Sing up" className="mb-3 text-center" />
            <AppInput id="email" name="email" label="Email" type="text" placeholder="mail@domail.com" className="mb-3" />
            <AppInput id="password" name="password" label="Password" type="password" placeholder="password" className="mb-3" />
            <AppInput id="confirm" name="confirm" label="Confirm Password" type="password" placeholder="password" />
            <div className="mt-4">
                <AppButton className="w-full" onClick={() => router.push("/home")}>Sign Up to Game</AppButton>
                <div className="text-center my-2 font-bold">or</div>
                <AppButton className="w-full" variant="outline">Login with Google</AppButton>
                <AppButton className="w-full mt-2" variant="ghost" onClick={() => router.push("/sign-in")}>Sign In To Game</AppButton>
            </div>
        </div>
    )
}