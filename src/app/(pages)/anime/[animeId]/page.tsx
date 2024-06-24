import AnimeDetailCard from "@/app/components/anime/anime-detail-card";
import EpisodeListCard from "@/app/components/anime/episode-list-card";

export default async function Page() {
    return (
        <main className="flex flex-col items-center justify-between">
            <AnimeDetailCard />
        </main>
    )
}
