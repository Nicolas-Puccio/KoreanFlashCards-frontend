exports.Globals = undefined
exports.songList = undefined//used by navbar //check: could i send this as a prop instead?//fix: delete


exports.fetchData = async (setDataInitialized) => {

    if (this.Globals)//data already initialized
        return


    this.Globals = {}
    this.Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? { score: [], reviewed: [] };
    this.Globals.$words = JSON.parse(localStorage.getItem('words')) ?? [];
    this.Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? [];
    console.log('setting up globals', this.Globals)

    //parses all string dates into Date
    this.Globals.$stats.score.forEach(stat => {//consider: should i use .map?
        stat.next = new Date(stat.next);
    })


    await Fetch('http://localhost:3001/api/song/', this.Globals.$songs)
    await Fetch('http://localhost:3001/api/song/word', this.Globals.$words)

    FilterUnusedWords()
    setDataInitialized(true)
}


const Fetch = async (url, data) => {
    await fetch(url, {
        headers: {
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA'
        }
    })
        .then(res => {
            data = res.json()
                .then(json => data = json)
                .catch(err => console.log(err))//check: do i need 2 .catch?
        })
        .catch(err => console.log(err))
}


//check: comment and optimization
const FilterUnusedWords = () => {
    this.Globals.$words = this.Globals.$words.filter(word => {
        for (let x = 0; x < this.Globals.$songs.length; x++) {
            const song = this.Globals.$songs[x];
            for (let i = 0; i < song.lines.length; i++) {
                const line = song.lines[i];
                for (let j = 0; j < line.structures?.length; j++) {
                    const structure = line.structures[j];
                    for (let y = 0; y < structure.words.length; y++) {
                        const word2 = structure.words[y];
                        if (word.word === word2.word)
                            return true
                    }
                }
            }
        }
        return false
    })

    localStorage.setItem('words', JSON.stringify(this.Globals.$words));
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