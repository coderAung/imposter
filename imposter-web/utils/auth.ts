import { cookies } from "next/headers";

export async function getAccessToken() {
    return (await cookies()).get("accessToken")?.value
}

export async function clearTokens() {
    (await cookies()).delete("accessToken")
}

export async function isLogin() {
    const token = await getAccessToken()
    return !!token
}

export async function setAccessToken(token:string) {
    (await cookies()).set("accessToken", token)
}