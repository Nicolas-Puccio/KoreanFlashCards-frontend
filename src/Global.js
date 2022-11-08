exports.Globals = undefined;

exports.fetchData = () => {
    //page needs to be refreshed twice to see new changes in db
    if (this.Globals)//data already initialized
    {
        console.log('globals already set up', this.Globals)
        return
    }

    //fix should wait for backend before reading localstorage?
    this.Globals = {}
    this.Globals.$stats = JSON.parse(localStorage.getItem('stats')) ?? [];
    this.Globals.$words = JSON.parse(localStorage.getItem('words')) ?? [];
    this.Globals.$songs = JSON.parse(localStorage.getItem('songs')) ?? [];
    console.log('setting up globals', this.Globals)

    //hook called twice, how to avoid double request?
    const request = new XMLHttpRequest();
    request.onreadystatechange = (event) => {
        if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
            localStorage.setItem('songs', request.responseText)
            this.Globals.$songs = JSON.parse(request.responseText);
        }
    };
    request.open('GET', 'http://localhost:3001/api/song/', true);

    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
    request.send();


    const request2 = new XMLHttpRequest();
    request2.onreadystatechange = (event) => {
        if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
            localStorage.setItem('words', request2.responseText)
            this.Globals.$words = JSON.parse(request2.responseText);
        }
    };
    request2.open('GET', 'http://localhost:3001/api/song/word', true);

    request2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request2.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
    request2.send();
}