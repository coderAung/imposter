import { AppBadge } from "@/components/customs/badges"
import { AppButton } from "@/components/customs/buttons"
import { AppCard } from "@/components/customs/cards"
import { Title } from "@/components/customs/fonts"
import { ArrowRight, Edit } from "lucide-react"

export const LobbyList = () => {
    return (
        <div>
            <Title title="Lobbies" className="mb-3"/>
            <div className="flex flex-col gap-y-3 py-2">
                {[1, 2, 3, 4, 5].map(i => <LobbyCard key={i} />)}
            </div>
        </div>
    )
}

export const LobbyCard = () => {
    return (
        <AppCard variant="blue" className="rounded-2xl flex justify-between">
            <div>
                <span>WeAreAPI</span>
                <div className="mt-3">
                    <AppBadge variant="green">Player - 7</AppBadge>
                </div>
            </div>
            <div>
                <AppButton variant="ghost" className="rounded-full"><Edit size={"1.2rem"}/></AppButton>
                <AppButton variant="ghost" className="rounded-full"><ArrowRight size={"1.2rem"}/></AppButton>
            </div>
        </AppCard>
    )
}