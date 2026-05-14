import "server-only"
import { redirect } from "next/navigation"
import { clearTokens, getAccessToken } from "./auth"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function publicRequest(path:string, options:RequestInit = {}, params?:{[key:string]: any}) {
    const resp = await fetch(api(path, params), options)
    return resp
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function secureRequest(path:string, options:RequestInit = {}, params?:{[key:string]: any}) {
    async function request(token:string) {
        return await fetch(api(path, params), {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": token
            }
        })
    }

    const accessToken = await getAccessToken()
    if (!accessToken) {
        await clearTokens()
        redirect("/sign-in")
    }
    const resp = await request(accessToken)
    if (!resp.ok) {}
    return resp
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function api(path:string, params?:{[key:string]: any}): string {
    const url = new URL(`${process.env.BACKEND_API}/${path}`)
    if(params) {
        url.search = new URLSearchParams(params).toString()
    }
    return url.toString()
}