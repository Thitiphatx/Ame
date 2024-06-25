"use client"

import { AnimeListResponse } from "@/app/types";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeCardList() {
    const [data, setData] = useState<AnimeListResponse[]>([]);
    const [error, setError] = useState();
    const router = useRouter();

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const res = await getQueryResult() as AnimeListResponse[];
                setData(res);
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchData();
    }, [])

    return (
        <>
        <div className="w-full">
            <h1 className="font-bold uppercase">trending</h1>
        </div>
        <div className="flex space-x-4 pb-4 w-full overflow-x-scroll scroll-smooth snap-x">
            {data.map((item)=> (
                <Card isPressable key={item.id} className="min-w-52 space-y-3 cursor-pointer transition scale-95 hover:scale-100 snap-start" onClick={()=> router.push(`/anime/${item.id}`)}>
                    <CardBody className="p-0">
                        <Image width={"100%"} className="object-cover h-72 rounded-lg" alt={item.title.userPreferred} src={item.coverImage.large}/>
                    </CardBody>
                    <CardFooter className="w-full flex flex-col items-start justify-start">
                        <h2 className="truncate font-bold w-full text-left">{item.title.userPreferred}</h2>
                        <small>{item.episodes ? `Episodes ${item.episodes}` : `On going`}</small>
                    </CardFooter>
                </Card>
            ))}
        </div>
        </>
    )
}

async function getQueryResult() {
    var query = `
        query($page:Int = 1 $id:Int $type:MediaType $isAdult:Boolean = false $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]) {
            Page(page:$page,perPage:18) {
                pageInfo{
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media(id:$id type:$type sort:$sort isAdult:$isAdult) {
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
        }
        `
    var variables = {
        page: 1,
        type: "ANIME",
        sort: ["TRENDING_DESC", "POPULARITY_DESC"],
    };

    try {
        var variables = {
            page: 1,
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
                query: query,
                variables: variables,
            }),
        })

        const { data } = await res.json();

        return data.Page.media
    } catch (error: any) {
        throw new Error(error.message)
    }
}