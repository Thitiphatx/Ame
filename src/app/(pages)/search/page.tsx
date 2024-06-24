"use client"

import { AnimeListResponse } from "@/app/types";
import { Button, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [strQuery, setStrQuery] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState<AnimeListResponse[]>([]);
    const router = useRouter();

    const submit = async (event: React.FormEvent)=> {
        event.preventDefault();
        const res = await getQueryResult(strQuery, 1);
        setData(res);
        setPage(2);
    }

    const loadMore = async ()=> {
        const res = await getQueryResult(strQuery, page);
        setData(prevData => [...prevData, ...res]);
        setPage(prevPage => prevPage + 1);
    }

    return (
        <div className="p-5">
            <form onSubmit={submit}>
                <Input label="search" value={strQuery} onValueChange={setStrQuery} />
            </form>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-5">
                {data.map((item)=> (
                    <div key={item.id} className="w-full space-y-3 cursor-pointer transition scale-95 hover:scale-100 snap-start" onClick={()=> router.push(`/anime/${item.id}`)}>
                        <div className="w-full h-72">
                            <img className="object-cover w-full h-full rounded-lg" alt={item.title.userPreferred} src={item.coverImage.large}/>
                        </div>
                        <div className="w-full">
                            <h2 className="truncate font-bold">{item.title.userPreferred}</h2>
                            <small>{item.episodes && `${item.episodes} episodes `}</small>
                        </div>
                    </div>
                ))}
            </div>
            {(data.length % 18 === 0 && data.length != 0) && <Button onClick={loadMore}>Load more</Button>}

        </div>
    )
}


async function getQueryResult(strQuery: string, page: number) {
    var query = `
        query($page:Int = 1 $search:String $id:Int $type:MediaType $isAdult:Boolean = false $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]) {
            Page(page:$page,perPage:18) {
                pageInfo{
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media(id:$id search:$search type:$type sort:$sort isAdult:$isAdult) {
                    id
                    title {
                        userPreferred
                    }
                    coverImage {
                        extraLarge
                        large
                        color
                    }
                    status(version:2)
                    episodes
                    isAdult
                }
            }
        }`



    try {
        var variables = {
            search: strQuery,
            page,
            type: "ANIME",
            sort: ["TRENDING_DESC", "POPULARITY_DESC"],
        };

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

        return data.Page.media;
    } catch (error) {
        console.error(error);
    }
} 