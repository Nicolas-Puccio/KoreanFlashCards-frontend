exports.Globals = undefined
// exports.setWordsToReview = undefined // set by review-page
// exports.setSelectedSong = undefined // set by songs-page

exports.fetchData = async (setDataInitialized, username) => {

    if (this.Globals) // data already initialized
        return


    console.log('setting up globals', this.Globals)

    this.Globals = {
        $stats: JSON.parse(localStorage.getItem('stats')) ?? { [username]: { score: [], reviewed: [] } },
        $words: JSON.parse(localStorage.getItem('words')) ?? [],
        $songs: JSON.parse(localStorage.getItem('songs')) ?? [],
        $username: username
    }

    // parses all string dates into Date
    this.Globals.$stats[username].score?.forEach(stat => {
        stat.next = new Date(stat.next)
    })


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
                this.Globals.$words = json.words
                this.Globals.$songs = json.songs
            }
        }
    } catch (err) {
        console.log(err)
        //check: i think this is fine the way it is, error display should be handled by App.js
    }



    // filters out unused words //check: refactor
    this.Globals.$words = this.Globals.$words.filter(word => {
        for (let x = 0; x < this.Globals.$songs.length; x++) {
            for (let i = 0; i < this.Globals.$songs[x].lines.length; i++) {
                for (let j = 0; j < this.Globals.$songs[x].lines[i].structures?.length; j++) {
                    for (let y = 0; y < this.Globals.$songs[x].lines[i].structures[j].words.length; y++) {
                        if (word.word === this.Globals.$songs[x].lines[i].structures[j].words[y].word)
                            return true
                    }
                }
            }
        }
        return false
    })



    localStorage.setItem('songs', JSON.stringify(this.Globals.$songs))
    localStorage.setItem('words', JSON.stringify(this.Globals.$words))


    setDataInitialized(true)
}