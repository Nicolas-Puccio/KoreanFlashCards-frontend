export let Globals = {}

//why do i have to use export instead of setting exports?

export const fetchData = async (setDataInitialized, username) => {

    if (Globals.$words) // data already initialized
        return


    Globals = {
        $stats: JSON.parse(localStorage.getItem('stats')) ?? { [username]: { score: [], reviewed: [] } },
        $words: JSON.parse(localStorage.getItem('words')) ?? [],
        $songs: JSON.parse(localStorage.getItem('songs')) ?? [],
        $username: username,

        setWordsToReview: undefined, // set by review-page
        setSelectedSong: undefined // set by songs-page
    }

    // parses all string dates into Date
    Globals.$stats[username].score?.forEach(stat => {
        stat.next = new Date(stat.next)
    })

    console.log('setting up globals', Globals)



    // fetches songs and words
    try {
        const res = await fetch('http://localhost:3001/api/song/')
        console.log(res)

        if (res) {
            const json = await res.json()
            console.log(json)

            if (res.status !== 200)
                alert(json.message)
            else {
                //check: backend will only send the properties that are not up to date on localStorage
                Globals.$words = json.words
                Globals.$songs = json.songs
            }
        }
    } catch (err) {
        console.log(err)
        //check: i think this is fine the way it is, error display should be handled by App.js
    }



    // filters out unused words //check: refactor
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