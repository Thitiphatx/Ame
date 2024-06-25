import AnimeCardList from "@/app/components/home/anime-card-list";

export default function Home() {
    
    return (
        <main className="flex flex-col items-center justify-between p-5">
            <h1 className="font-bold text-4xl">Ame</h1>
            <AnimeCardList />
            <AnimeCardList />
            <AnimeCardList />
        </main>
    );
}


const active = "bg-black hover:bg-danger"