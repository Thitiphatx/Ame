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

    abstract getSearch(query: string, page?: string): Promise<SourceSearchResult[]>;
    abstract getEpisodes(id: string): Promise<Episode[]>;
    abstract getEpisodeDetails(id: string): Promise<EpisodeDetail>;
}

export interface SourceSearchResult {
    id: string,
    title: string,
    coverImage: string
}