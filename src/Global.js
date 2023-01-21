exports.Globals = undefined
//exports.setWordsToReview = undefined //set by review-page
//exports.setSelectedSong = undefined //set by songs-page

exports.fetchData = async (setDataInitialized) => {

    if (this.Globals)//data already initialized
        return


    this.Globals = {}
    this.Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? { score: [], reviewed: [] }
    this.Globals.$words = JSON.parse(localStorage.getItem('words')) ?? []
    this.Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? []
    console.log('setting up globals', this.Globals)

    //parses all string dates into Date
    this.Globals.$stats.score.forEach(stat => {//consider: should i use .map?
        stat.next = new Date(stat.next);
    })


    await Fetch('http://localhost:3001/api/song/', '$songs')
    await Fetch('http://localhost:3001/api/song/word', '$words')
    localStorage.setItem('songs', JSON.stringify(this.Globals.$songs))

    FilterUnusedWords()//also setsItem on localstorage
    setDataInitialized(true)
}


const Fetch = async (url, property) => {
    await fetch(url, { credentials: 'include' })
        .then(res => {
            res.json().then(json => {
                if (res.status !== 200)
                    alert(json.message)
                else
                    this.Globals[property] = json
            })
        })
        .catch(err => console.log(err))
}


//check: comment and optimization
const FilterUnusedWords = () => {
    this.Globals.$words = this.Globals.$words.filter(word => {
        for (let x = 0; x < this.Globals.$songs.length; x++) {
            const song = this.Globals.$songs[x]
            for (let i = 0; i < song.lines.length; i++) {
                const line = song.lines[i]
                for (let j = 0; j < line.structures?.length; j++) {
                    const structure = line.structures[j];
                    for (let y = 0; y < structure.words.length; y++) {
                        if (word.word === structure.words[y].word)
                            return true
                    }
                }
            }
        }
        return false
    })

    localStorage.setItem('words', JSON.stringify(this.Globals.$words))
}



// eslint-disable-next-line
const statsExample = {
    score: [],
    reviewed: [
        {
            next: new Date(),
            reviewed: ["do", "run"]
        }
    ]
}