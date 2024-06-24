import { AnimeSource, Episode, EpisodeDetail, SourceSearchResult } from "@/app/types/source";
import axios from 'axios';
import cheerio from 'cheerio';

export class ShibaAnime extends AnimeSource {
    metadata = {
        id: "ShibaAnime",
        name: "Shibaanime",
        icon: "https://icons.veryicon.com/png/o/cartoon/childhood-icon/2-doraemon-01.png",
        version: "1.0.0",
        baseURL: "https://www.shibaanime.com"
    }

    async getSearch(query: string, page?: string): Promise<SourceSearchResult[]> {
        const { data } = await axios.get(`${this.metadata.baseURL}/search/page/1?q=${encodeURI(query)}`)
        const $ = cheerio.load(data);
        const result: SourceSearchResult[] = [];
        $('div.flex-wrap-movielist > div > a').map((index, anime) => {
            const id = $(anime).attr('href') ?? "";
            const coverImage = $('img', anime).attr('data-src') ?? "";
            const title = $('img', anime).attr('alt') ?? "";

            result.push({
                id,
                title,
                coverImage
            })
        })
        return result;
    }

    async getEpisodes(id: string): Promise<Episode[]> {
        const { data } = await axios.get(`${id}`);
        const $ = cheerio.load(data);

        const episodes: Episode[] = [];
        $('#overview > div > div > div.mvcast-item > div.cast-it > div > div > a').map((index, ep) => {
            const id = $(ep).attr('href') ?? ""
            episodes.push({
                id,
                number: index+1,
            })
        })
        episodes.reverse();
        return episodes
    }
    
    async getEpisodeDetails(id: string): Promise<EpisodeDetail> {
        const { data } = await axios.get(`${id}`);
        const $ = cheerio.load(data);
        const title = $('div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > h1').text();
        const embedURL = $('iframe.embed-responsive-item').attr('src');
        const { data: data2 } = await axios.get(`${embedURL}`);
        const $2 = cheerio.load(data2);
        const srcID = $2.html().split("https://akuma-player.xyz/play/")[1].split(`\\"`)[0];
        return {
            title,
            source: `https://files.akuma-player.xyz/view/${srcID}.m3u8`,
        }
    }
}