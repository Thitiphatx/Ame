"use client"
import { AnimeDetailResponse } from "@/app/types";
import { Button, ScrollShadow, Image } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EpisodeListCard from "./episode-list-card";

export default function AnimeDetailCard() {
    const router = usePathname();
    const [animeId, setAnimeId] = useState<string>("");
    const [data, setData] = useState<AnimeDetailResponse | undefined>();
    const [error, setError] = useState("");

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const res = await fetch(`/api/anilist/animeinfo?animeId=${router.split("/")[2]}`);
                const detail = await res.json();
                setData(detail);
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchData();
    }, [router])

    return (
        <div className="w-full">
            <div className="w-full h-64 shadow-[inset_0px_-40px_40px_0px_#000000] absolute">
            </div>
            <img className="object-cover w-full h-64" src={data?.bannerImage ?? data?.coverImage.extraLarge}/>
            <div className="max-w-screen-xl mx-auto px-5 grid md:grid-cols-3 lg:grid-cols-5 grid-rows-1 gap-2">
                <div className="flex flex-col gap-5 w-full -translate-y-20">
                    <img className="object-cover w-full h-80 shadow-md rounded-lg" src={data?.coverImage.large} />
                    <Button radius="sm" variant="shadow" style={{backgroundColor: `${data?.coverImage.color}`}}>Add to favorite</Button>
                </div>
                <div className="md:col-span-2 lg:col-span-4 p-5 space-y-5">
                    <h1 className="text-xl font-bold">{data?.title.userPreferred}</h1>
                    <small className="italic">{data?.title.romaji}</small>
                    <ScrollShadow hideScrollBar className="max-h-40">
                        <p dangerouslySetInnerHTML={{ __html: data?.description ?? ""}} />
                    </ScrollShadow>
                </div>
            </div>
            {data && <EpisodeListCard data={data} />}
        </div>
    )
}   