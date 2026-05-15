"use client"
import { AppButton } from "@/components/customs/buttons"
import { Title } from "@/components/customs/fonts"
import { AppInput } from "@/components/customs/forms"
import { SignUpForm } from "@/models/schemas"
import { signUp } from "@/services/actions/auth.action"
import Link from "next/link"
import { useState } from "react"

export default function SignUp() {

    const [form, setForm] = useState<SignUpForm>({name: "", email: "", password: "", confirm: ""})

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if(form.password !== form.confirm) return
        await signUp(form)
    }

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({...prev, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit} className="rounded w-full md:w-1/3 mt-4 p-3">
            <Title title="Imposter Game - Sing up" className="mb-3 text-center" />
            <AppInput onChange={handleInput} value={form.name} id="name" name="name" label="Name" type="text" placeholder="Jhon Doe" className="mb-3" />
            <AppInput onChange={handleInput} value={form.email} id="email" name="email" label="Email" type="text" placeholder="mail@domail.com" className="mb-3" />
            <AppInput onChange={handleInput} value={form.password} id="password" name="password" label="Password" type="password" placeholder="password" className="mb-3" />
            <AppInput onChange={handleInput} value={form.confirm} id="confirm" name="confirm" label="Confirm Password" type="password" placeholder="password" />
            <div className="mt-4">
                <AppButton className="w-full block" type="submit">Sign Up to Game</AppButton>
                <div className="text-center my-2 font-bold">or</div>
                <AppButton className="w-full" variant="outline">Login with Google</AppButton>
                <AppButton className="w-full block mt-2 text-center" variant="ghost" asChild><Link href={"/sign-in"}>Sign In To Game</Link></AppButton>
            </div>
        </form>
    )
}