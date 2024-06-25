"use server"

import { AnimeSource, SourceSearchResponse } from "../types/source"
import { ShibaAnime } from "./shibaanime"

const sources: AnimeSource[] = [
    new ShibaAnime(),
    // ....
]

export async function getMetadata(sourceId?: string) {
    if (sourceId) {
        const specificSource = sources.find(src => src.metadata.id === sourceId);
        if (!specificSource)
            throw new Error(`Source with id ${sourceId} not found.`);

        return specificSource.metadata
    }
    
    return sources.map(src => src.metadata);
}

export async function getSearch(query: string, page: string, sourceId?: string): Promise<SourceSearchResponse[]> {
    if (sourceId) {
        const specificSource = sources.find(src => src.metadata.id === sourceId);
        if (!specificSource)
            throw new Error(`Source with id ${sourceId} not found.`);

        return [await specificSource.getSearch(query, page)]
    }

    return await Promise.all(sources.map(src => src.getSearch(query, page)));
}

export async function getEpisodes(sourceId: string, animeId: string) {
    const specificSource = sources.find(src => src.metadata.id === sourceId);
    if (!specificSource)
        throw new Error(`Source with id ${sourceId} not found.`);

    return await specificSource.getEpisodes(animeId);
}

export async function getEpisodeDetails(sourceId: string, episodeId: string) {
    const specificSource = sources.find(src => src.metadata.id === sourceId);
    if (!specificSource)
        throw new Error(`Source with id ${sourceId} not found.`);
    
    return await specificSource.getEpisodeDetails(episodeId);
}

