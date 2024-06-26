"use client"

import { AnimeListResponse } from "@/app/types";
import { useEffect, useState } from "react";
import AnimeCardList from "./anime-card-list";
import { getCurrentSeason } from "@/app/libs/season-detector";

export default function AiringList() {
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
        id: "airing",
        title: "top airing"
    }

    return (
        <>
            <AnimeCardList identity={identity} items={data}/>
        </>
    )
}

async function getQueryResult() {
    var query = `
        query(
                $page:Int = 1
                $id:Int
                $type:MediaType
                $isAdult:Boolean = false
                $sort:[MediaSort] = [POPULARITY_DESC,SCORE_DESC]
                $status: MediaStatus
                $season: MediaSeason
                $seasonYear: Int
            ) {
            Page(page:$page,perPage:18) {
                pageInfo{
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media(
                        id: $id
                        type: $type
                        sort: $sort
                        isAdult: $isAdult
                        status: $status
                        season: $season
                        seasonYear: $seasonYear
                    ) {
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

    const { season, year } = getCurrentSeason();

    try {
        var variables = {
            page: 1,
            type: "ANIME",
            status: "RELEASING",
            season: season,
            seasonYear: year,
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