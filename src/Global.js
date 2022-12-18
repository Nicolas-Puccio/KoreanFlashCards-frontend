exports.Globals = undefined;
exports.App = undefined;//used to remove loading screen
exports.songList = undefined;//used by navbar //check: could i send this as a prop instead?

let requestReceivedAmount = 0;
const requestRequired = 2;
let App;

exports.fetchData = (App2) => {//consider: change App2 name
    //fix: function should still notify App component even if the requests to server failed (user is offline)


    if (this.Globals)//data already initialized
    {
        console.log('globals already set up', this.Globals);
        return;
    }
    App = App2;

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
                requestReceived();
            }
            else {
                requestReceived();
            }
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
                requestReceived();
            }
            else {
                requestReceived();
            }
        }
    };
    request2.open('GET', 'http://localhost:3001/api/song/word', true);

    request2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request2.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
    request2.send();
}

const requestReceived = () => {//fix2: properly use promises for this
    requestReceivedAmount++;
    console.log(requestReceivedAmount)
    if (requestReceivedAmount === requestRequired)
        App.DataLoaded();
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