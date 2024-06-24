import { NextApiRequest } from "next";

export const runtime = "edge";

function getQuery() {
    return `
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
}

export async function GET(req: NextApiRequest) {
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
                query: getQuery(),
                variables: variables,
            }),
        })

        const { data } = await res.json();

        return Response.json(
            data.Page.media,
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return Response.json(error, { status: 500 });
    }
}
