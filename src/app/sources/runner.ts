"use server"

import { RunnerAction } from "../types";
import { AnimeSource } from "../types/source"
import { ShibaAnime } from "./shibaanime"

export default async function Runner(action: RunnerAction, source?: string, query?: string, page?: string, id?: string) {
    const sources: AnimeSource[] = [new ShibaAnime()];

    switch (action) {
        case "metadata":
            if (source) {
                const specificSource = sources.find(src => src.metadata.id === source);
                return specificSource ? [specificSource.metadata] : [];
            } else {
                return sources.map(src => src.metadata);
            }
        case "getSearch":
            if (source) {
                const specificSource = sources.find(src => src.metadata.id === source);
                return specificSource ? [await specificSource.getSearch(query ?? "", page)] : [];
            } else {
                const searchResults = await Promise.all(sources.map(src => src.getSearch(query ?? "", page)));
                return searchResults;
            }
        case "getEpisodes":
            if (!id || !source)
                throw new Error("No source or anime id");
            if (source) {
                const specificSource = sources.find(src => src.metadata.id === source);
                return specificSource ? await specificSource.getEpisodes(id) : [];
            }

        case "getEpisodeDetails":
            if (!id || !source) throw new Error("No source or episode id");

            if (source) {
                const specificSource = sources.find(src => src.metadata.id === source);
                return specificSource ? await specificSource.getEpisodeDetails(id) : undefined;
            }
                
        default:
            throw new Error("No action");
    }
}
