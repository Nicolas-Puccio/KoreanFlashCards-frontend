import { getData } from './services/api'
export let Globals = {
    setWordsToReview: undefined, // set by review-page
    setSelectedSong: undefined // set by songs-page
}

//why do i have to use export instead of setting exports.Globals?

export const setGlobals = async (data) => {

    if (Globals.$words) // data already initialized
        return



    //backend responded
    if (data) {
        Globals.$words = data.words
        Globals.$songs = data.songs

        if (data.stats.length)
            Globals.$stats = data.stats
        else
            Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


        localStorage.setItem('songs', JSON.stringify(Globals.$songs))
        localStorage.setItem('words', JSON.stringify(Globals.$words))
        localStorage.setItem('stats', JSON.stringify(Globals.$stats))
    }

    else {
        Globals.$words = JSON.parse(localStorage.getItem('words')) ?? []
        Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? []
        Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? []


        if (Globals.$words.length)
            alert('backend is down but a copy of the data has been loaded from localStorage')
    }



    // parses all string dates into Date
    Globals.$stats.forEach(stat => {
        stat.next = new Date(stat.next)
    })
}
