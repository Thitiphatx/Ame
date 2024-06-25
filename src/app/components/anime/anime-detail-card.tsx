"use client"
import { AnimeDetailResponse, Episode, EpisodeDetail } from "@/app/types";
import { Button, ScrollShadow, Input } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getEpisodeDetails, getEpisodes, getSearch } from "@/app/sources/runner";
import { SourceSearchResponse } from "@/app/types/source";
import ReactPlayer from "react-player";

export default function AnimeDetailCard() {
    const path = usePathname();
    const [data, setData] = useState<AnimeDetailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [searchBar, setSearchBar] = useState<string>("");
    const [searchResult, setSearchResult] = useState<SourceSearchResponse[]>([]);

    const [playerUrl, setPlayerUrl] = useState<string | null>("https://files.akuma-player.xyz/files/431d1d5c1041ae2c9d8ef842683e448f_.txt");

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const res = await getQueryResult(path.split("/")[2]);
                setData(res);
                setSearchBar(res?.title.userPreferred ?? "");
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchData();
    }, [path])

    const fetchSource = async (event: React.FormEvent)=> {
        event.preventDefault();
        try {
            const res = await getSearch(searchBar, "1") as SourceSearchResponse[];
            setSearchResult(res);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const fetchEpisode = async (sourceId: string, animeId: string)=> {
        try {
            const res = await getEpisodes(sourceId, animeId) as Episode[];
            if (data) {
                const updatedData = {
                    ...data,
                    episodeList: {
                        id: sourceId,
                        episodes: res
                    }
                }
                setData(updatedData);
            }
        } catch (err: any) {
            setError(err.message);
        }
    }

    const fetchEpisodeDetail = async (sourceId: string, episodeId: string)=> {
        try {
            const res = await getEpisodeDetails(sourceId, episodeId) as EpisodeDetail;
            setPlayerUrl(res.source);
        } catch (err: any) {
            setError(err.message);
        }
    }



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
            <div className="max-w-screen-xl mx-auto px-5">
            {!data?.episodeList && (
                <>
                <form onSubmit={fetchSource}>
                    <Input label="search" value={searchBar} onValueChange={setSearchBar}/>
                </form>
                <div>
                    {searchResult.map((source)=> (
                        <div key={source.id}>
                            {source.id}
                            <div className="flex overflow-x-scroll">
                                {source.items.map((item)=> (
                                    <div key={item.id} className="min-w-52 space-y-3 cursor-pointer transition scale-95 hover:scale-100 snap-start" onClick={()=> fetchEpisode(source.id, item.id)}>
                                        <div className="w-full h-72">
                                            <img className="object-cover w-full h-full rounded-lg" alt={item.title} src={item.coverImage}/>
                                        </div>
                                        <div className="w-full">
                                            <h2 className="truncate font-bold">{item.title}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
            {data?.episodeList && (
                <ScrollShadow orientation="horizontal" className="snap-x">
                    <div className="flex gap-2">
                        {data.episodeList.episodes.map((ep)=> (
                            <div key={ep.id} className="min-w-40 snap-start scale-95 cursor-pointer hover:scale-100 transition" onClick={()=> fetchEpisodeDetail(data.episodeList?.id || "", ep.id)}>
                                <img src={ep.coverImage ?? data.coverImage.large} className="object-cover w-full h-24 rounded-lg"/>
                                <div className="p-2">
                                    <h3 className="truncate text-sm">{ep.title}</h3>
                                    <small className="font-bold">Episode {ep.number}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollShadow>
            )}
            {playerUrl}
            {playerUrl && <ReactPlayer url={playerUrl} controls width={"100%"} height={"100%"}/>}
            </div>
        </div>
    )
}

async function getQueryResult(animeId: string) {
    var query = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {
                romaji
                english
                native
                userPreferred
            }
            description
            type
            episodes
            startDate {
                year
                month
                day
            }
            coverImage {
                extraLarge
                large
                medium
                color
            }
            bannerImage
            genres
            relations {
                edges {
                    id
                }
            }
        }
    }`
    var variables = {
        id: parseInt(animeId),
    }



    try {
        const res = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        })

        const { data } = await res.json();

        return data.Media;
    } catch (error: any) {
        throw new Error(error.message)
    }
}