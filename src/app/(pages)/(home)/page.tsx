import AiringList from "@/app/components/home/airing";
import TrendingList from "@/app/components/home/trending";
import UpcomingList from "@/app/components/home/upcoming";

export default function Home() {
    
    return (
        <main className="flex flex-col items-center justify-between p-5">
            <h1 className="font-bold text-4xl">Ame</h1>
            <div className="w-full space-y-10">
                <UpcomingList />
                <AiringList />
                <TrendingList />
            </div>

        </main>
    );
}