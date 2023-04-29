import { getData } from './services/api'
export let Globals = {}
//why do i have to use export instead of setting exports.Globals?

export const fetchData = async (setDataInitialized) => {

    if (Globals.$words) // data already initialized
        return


    Globals = {
        $stats: JSON.parse(localStorage.getItem('stats')) ?? { score: [], reviewed: [] },
        $words: JSON.parse(localStorage.getItem('words')) ?? [],
        $songs: JSON.parse(localStorage.getItem('songs')) ?? [],

        setWordsToReview: undefined, // set by review-page
        setSelectedSong: undefined // set by songs-page
    }


    // parses all string dates from localStorage into Date
    Globals.$stats.score?.forEach(stat => {
        stat.next = new Date(stat.next)
    })


    const data = await getData()
    if (data) {
        Globals.$words = data.words
        Globals.$songs = data.songs
    }
    else {
        alert('whooops')
    }



    localStorage.setItem('songs', JSON.stringify(Globals.$songs))
    localStorage.setItem('words', JSON.stringify(Globals.$words))


    setDataInitialized(true)
}
