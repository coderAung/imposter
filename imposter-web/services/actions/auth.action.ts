"use server"
import { AuthResult, ModificationResult } from "@/models/dtos";
import { SignInForm, SignUpForm } from "@/models/schemas";
import { setAccessToken } from "@/utils/auth";
import { publicRequest } from "@/utils/rest-client";
import { redirect } from "next/navigation";

export async function signIn(form:SignInForm) {
    const resp = await publicRequest("auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const result = (await resp.json()) as AuthResult
    await setAccessToken(`${result.token_type} ${result.access_token}`)
    redirect("/home")
}

export async function signUp(form:SignUpForm) {
    const resp = await publicRequest("auth/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    if(!resp.ok) {}
    redirect("/sign-in")
}