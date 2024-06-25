import { Episode, EpisodeDetail } from ".."

export abstract class AnimeSource {
    abstract readonly metadata: {
        readonly id: string,
        readonly name: string,
        readonly icon?: string,
        readonly version: string,
        readonly baseURL: string,
        readonly apiURL?: string,
    }

    abstract getSearch(query: string, page?: string): Promise<SourceSearchResponse>;
    abstract getEpisodes(id: string): Promise<Episode[]>;
    abstract getEpisodeDetails(id: string): Promise<EpisodeDetail>;
}

export interface SourceSearchResponse {
    id: string,
    items: SearchItem[]
}

export interface SearchItem {
    id: string,
    title: string,
    coverImage: string
}