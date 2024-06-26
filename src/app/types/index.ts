export type NavigationPage = "/" | "/search" | "/user"

export type NavigationBar = {
    path: NavigationPage,
    icon: {
        outline: JSX.Element,
        fill: JSX.Element
    }
}

export interface Episode {
    id: string,
    number: number,
    title?: string,
    coverImage?: string
}

export interface EpisodeSource {
    id: string, // source id
    episodes: Episode[]
}

export interface EpisodeDetail {
    title: string,
    source: string
}

export type AnimeDetailResponse = {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    description: string;
    type: string;
    episodes: number;
    episodeList?: EpisodeSource,
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
    };
    bannerImage: string;
    genres: string[];
    relations: {
        edges: {
            id: number;
        };
    };
};

export interface AnimeListResponse {
    id: number,
    title: {
        userPreferred: string
    },
    coverImage: {
        extraLarge: string,
        large: string,
        color: string
    },
    status: string,
    episodes: number,
    isAdult: boolean
}