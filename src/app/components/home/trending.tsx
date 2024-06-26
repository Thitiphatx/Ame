"use client"

import { AnimeListResponse } from "@/app/types";
import { useEffect, useState } from "react";
import AnimeCardList from "./anime-card-list";

export default function TrendingList() {
    const [data, setData] = useState<AnimeListResponse[]>([]);

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const res = await getQueryResult() as AnimeListResponse[];
                setData(res);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [])

    const identity = {
        id: "trending",
        title: "trending"
    }

    return (
        <>
            <AnimeCardList identity={identity} items={data}/>
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