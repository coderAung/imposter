"use client"
import { AppButton } from "@/components/customs/buttons"
import { Title } from "@/components/customs/fonts"
import { AppInput } from "@/components/customs/forms"
import { SignInForm } from "@/models/schemas"
import { signIn } from "@/services/actions/auth.action"
import Link from "next/link"
import { useState } from "react"

export default function SignIn() {
    const [form, setForm] = useState<SignInForm>({ email: "", password: "" })
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({...prev, [name]: value} as SignInForm))
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if(form.email === "" || form.password === "") return
        await signIn(form)
    }
    return (
        <form onSubmit={handleSubmit} className="rounded w-full md:w-1/3 mt-4 p-3">
            <Title title="Imposter Game - Sign in" className="mb-3 text-center" />
            <AppInput onChange={handleInput} value={form?.email} id="email" name="email" label="Email" type="text" placeholder="mail@domail.com" className="mb-3" />
            <AppInput onChange={handleInput} value={form?.password} id="password" name="password" label="Password" type="password" placeholder="password" className="mb-3" />
            <div className="mt-4">
                <AppButton className="w-full block text-center" type="submit">Sign In to Game</AppButton>
                <div className="text-center my-2 font-bold">or</div>
                <AppButton className="w-full" variant="outline">Login with Google</AppButton>
                <Link className="text-center block mt-4" href={"/sign-up"}>Sign Up To Game</Link>
            </div>
        </form>
    )
}