"use server"

export async function getAnimeDetails(id: number) {
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
    }`;

    var variables = {
        id: id,
    }

    var url = "https://graphql.anilist.co",
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}