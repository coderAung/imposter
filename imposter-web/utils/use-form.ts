import { useState } from "react";

export function useForm<T>(t:T) {
    const [form, setForm] = useState<T>(t)
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({...prev, [name]: value} as T))
    }
    return {form, handleInput}
}