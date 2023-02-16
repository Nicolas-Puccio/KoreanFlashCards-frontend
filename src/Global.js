export let Globals = {}

//why do i have to use export instead of setting exports?

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

    // parses all string dates into Date
    Globals.$stats.score?.forEach(stat => {
        stat.next = new Date(stat.next)
    })



    // fetches songs and words
    try {
        const res = await fetch('http://localhost:3001/api/song/')

        if (res) {
            const json = await res.json()

            Globals.$words = json.words
            Globals.$songs = json.songs
        }
    } catch (err) {
        console.error(err)
    }



    // filters out unused words //consider: optimize
    Globals.$words = Globals.$words.filter(word => {
        for (let x = 0; x < Globals.$songs.length; x++) {
            for (let i = 0; i < Globals.$songs[x].lines.length; i++) {
                for (let j = 0; j < Globals.$songs[x].lines[i].structures?.length; j++) {
                    for (let y = 0; y < Globals.$songs[x].lines[i].structures[j].words.length; y++) {
                        if (word.word === Globals.$songs[x].lines[i].structures[j].words[y].word)
                            return true
                    }
                }
            }
        }
        return false
    })



    localStorage.setItem('songs', JSON.stringify(Globals.$songs))
    localStorage.setItem('words', JSON.stringify(Globals.$words))


    setDataInitialized(true)
}