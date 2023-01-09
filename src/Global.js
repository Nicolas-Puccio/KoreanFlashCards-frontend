exports.Globals = undefined;
exports.songList = undefined;//used by navbar //check: could i send this as a prop instead?

let requestReceivedAmount = 0;
const requestRequired = 2;

exports.fetchData = (App) => {//consider: change App2 name

    if (this.Globals)//data already initialized
    {
        console.log('globals already set up', this.Globals);
        return;
    }

    this.Globals = {}
    this.Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? { score: [], reviewed: [] };
    this.Globals.$words = JSON.parse(localStorage.getItem('words')) ?? [];
    this.Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? [];
    console.log('setting up globals', this.Globals)


    //parses all string dates into Date
    this.Globals.$stats.score.forEach(stat => {//consider: should i use .map?
        stat.next = new Date(stat.next);
    })

    //fix2: use a library or something to simplify this requests, also create a function that takes URL and Object as parameters to reduce code repetition
    const request = new XMLHttpRequest();
    request.onreadystatechange = (event) => {
        if (event.currentTarget.readyState === 4) {
            if (event.currentTarget.status === 200) {
                localStorage.setItem('songs', request.responseText);
                this.Globals.$songs = JSON.parse(request.responseText);
            }
            //this will execute even if the request failed
            requestReceived(App);
        }
    }
    request.open('GET', 'http://localhost:3001/api/song/', true);

    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
    request.send();


    const request2 = new XMLHttpRequest();
    request2.onreadystatechange = (event) => {
        if (event.currentTarget.readyState === 4) {
            if (event.currentTarget.status === 200) {
                localStorage.setItem('words', request2.responseText);
                this.Globals.$words = JSON.parse(request2.responseText);
            }
            //this will execute even if the request failed
            requestReceived(App);
        }
    };
    request2.open('GET', 'http://localhost:3001/api/song/word', true);

    request2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request2.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
    request2.send();
}

const requestReceived = (App) => {//fix2: properly use promises for this
    requestReceivedAmount++;

    if (requestReceivedAmount === requestRequired) {
        FilterUnusedWords()
        App.DataLoaded()
    }
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