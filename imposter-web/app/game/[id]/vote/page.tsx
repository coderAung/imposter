import { Title } from "@/components/customs/fonts";
import { VoteArea } from "../../_parts/votes";

export default function Vote() {
    return (
        <div className="md:w-1/2 md:mx-auto p-2 mt-10">
            <Title title="Who do you think is the imposter?" className="text-center" />
            <VoteArea className="mt-10" />
        </div>
    )
}