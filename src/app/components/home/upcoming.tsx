"use client"

import { AnimeListResponse } from "@/app/types";
import { useEffect, useState } from "react";
import AnimeCardList from "./anime-card-list";
import { getNextSeason } from "@/app/libs/season-detector";

export default function UpcomingList() {
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
        id: "upcoming",
        title: "upcoming"
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

    const { season, year } = getNextSeason();

    try {
        var variables = {
            page: 1,
            type: "ANIME",
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