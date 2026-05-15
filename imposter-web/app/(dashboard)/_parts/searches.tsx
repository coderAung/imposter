"use client"
import { AppButton } from "@/components/customs/buttons"
import { Title } from "@/components/customs/fonts"
import { AppInput } from "@/components/customs/forms"
import { AppModal } from "@/components/customs/modals"
import { ProfileListItem } from "@/models/dtos"
import { ProfileSearchForm } from "@/models/searches"
import { findByKeyword } from "@/services/actions/profile.action"
import { useForm } from "@/utils/use-form"
import { Search } from "lucide-react"
import { FormEvent, useState } from "react"

export const SearchAccountModal = ({open = false, close}: {open:boolean, close?:() => void}) => {
    return (
        <AppModal open={open} close={close}>
            <AppModal.Dialog className="w-[95%] md:w-1/2">
                <AppModal.Header>
                    <Title title="Find Friends" />
                </AppModal.Header>
                <AppModal.Body>
                    <AccountSearch/>
                </AppModal.Body>
            </AppModal.Dialog>
        </AppModal>
    )
}

const AccountSearch = () => {
    const [items, setItems] = useState<ProfileListItem[]>([])
    const {form, handleInput} = useForm<ProfileSearchForm>({keyword: ""})
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        const result = await findByKeyword(form)
        setItems(result)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-x-2">
                <AppInput value={form?.keyword} onChange={handleInput} name="keyword" className="flex-1" placeholder="Email or username" />
                <AppButton type="submit" variant="secondary" color="green" className="px-5"><Search /></AppButton>
            </form>
            <div>
                {items.map(i => <ProfileItem item={i} key={i.account_id} />)}
            </div>
        </div>
    )
}

const ProfileItem = ({className, item:{account_id, name, email, username, profile_photo}}:{className?:string, item:ProfileListItem}) => {
    return (
        <div className={`border-b border-green-400/50 p-3 ${className}`}>
            <div></div>
            <div className="flex flex-col">
                <span>{name}</span>
                <span>{username}</span>
                <span>{email}</span>
            </div>
        </div>
    )
}