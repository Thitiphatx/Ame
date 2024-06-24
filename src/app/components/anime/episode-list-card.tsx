"use client"

import Runner from "@/app/sources/runner";
import { AnimeDetailResponse, Episode } from "@/app/types"
import { SourceSearchResult } from "@/app/types/source";
import { Card, CardBody, Image, Input, ScrollShadow } from "@nextui-org/react"
import { useEffect, useState } from "react";

export default function EpisodeListCard({ data }: { data: AnimeDetailResponse | undefined}) {
    const [strQuery, setStrQuery] = useState<string>("");
    const [list, setList] = useState<Episode[]>([]);

    const [searchResult, setSearchResult] = useState<SourceSearchResult[]>([]);
    const [page, setPage] = useState(1);
    const [matchId, setMatchId] = useState<string>("");

    useEffect(()=> {
        setStrQuery(data?.title.userPreferred ?? "");
    }, [data])

    const submit = async (event: React.FormEvent)=> {
        event.preventDefault();
        const res = await Runner("getSearch", undefined, strQuery, "1") as SourceSearchResult[][];
        console.log(res)
        setSearchResult(res[0]);
        setPage(2);
    }

    const loadMore = async ()=> {
        const res = await Runner("getSearch", undefined, strQuery, `${page}`) as SourceSearchResult[][];
        setSearchResult(prevData => [...prevData, ...res[0]]);
        setPage(prevPage => prevPage + 1);
    }

    const setMatchingSource = async (id: string)=> {
        setMatchId(id);
        const res = await Runner("getEpisodes", "ShibaAnime", undefined, undefined, id) as Episode[];
        setList(res);
    }

    if (list.length === 0) {
        return <>
            No episode
            <form onSubmit={submit}>
                <Input label="search" value={strQuery} onValueChange={setStrQuery} />
            </form>
            {searchResult.map((item, index)=> (
                <div onClick={() => setMatchingSource(item.id)}>
                    <img src={item.coverImage}/>
                    {item.title}
                </div>
            ))}
            
        </>
    }

    return (
        <ScrollShadow hideScrollBar orientation="horizontal" className="max-w-screen-xl">
            <div className="w-full flex flex-row gap-2 overflow-x-scroll">
                {list.map((ep, index)=> (
                    <Card key={index} className="min-w-64">
                        <img className="w-full h-32 object-cover" src={ep.coverImage ?? data?.coverImage.large} />
                        <CardBody>
                            <h1 className="truncate">
                                {ep.title ?? data?.title.userPreferred}
                            </h1>
                            <small className="font-bold truncate">{ep.number}</small>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </ScrollShadow>
        
    )
}
