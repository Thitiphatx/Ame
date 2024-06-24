import { NextApiRequest } from "next";

export const runtime = "edge";

function getAnimeQuery() {
    return `
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
}

export async function GET(req: NextApiRequest) {
    try {
        const { searchParams } = new URL(req.url ?? "");
        const animeId = searchParams.get('animeId');
        if (!animeId)
            return Response.json("Anime id is required!", { status: 401 });

        var variables = {
            id: parseInt(animeId),
        }
        console.log(variables)

        const res = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: getAnimeQuery(),
                variables: variables,
            }),
        })

        const { data } = await res.json();

        return Response.json(
            data.Media,
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return Response.json(error, { status: 500 });
    }
}
