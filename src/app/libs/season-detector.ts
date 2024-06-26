export function getCurrentSeason() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let season = "";

    if (month >= 1 && month <= 3) {
        season = "WINTER";
    } else if (month >= 4 && month <= 6) {
        season = "SPRING";
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER";
    } else if (month >= 10 && month <= 12) {
        season = "FALL";
    }

    return { season, year }
}

export function getNextSeason() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let season = "";

    if (month >= 1 && month <= 3) {
        season = "SPRING";
    } else if (month >= 4 && month <= 6) {
        season = "SUMMER";
    } else if (month >= 7 && month <= 9) {
        season = "FALL";
    } else if (month >= 10 && month <= 12) {
        season = "WINTER";
    }

    return { season, year }
}