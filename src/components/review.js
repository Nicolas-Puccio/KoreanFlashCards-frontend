import React from 'react';

class Review extends React.Component {

    componentDidMount() {
        //hook called twice, how to avoid double request?
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                //later... filter only required words by next property
                this.data = JSON.parse(request.responseText);

                //fix should i do this on bakc or frontend?
                this.data.words = this.data.words.filter(word => {
                    const stat = this.data.stats.find(word2 => word2.word === word._id)
                    if (stat)
                        return new Date(stat.next) < new Date()
                    else
                        return true
                })

                console.log(this.data)
                this.shuffle();
                //hook function to buttons
                //function sends request and chooses new random word
                //if no words left set property as undefined
            }
        };
        request.open('GET', 'http://localhost:3001/api/song/word', true);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
        request.send();
    }

    shuffle() {
        this.setState({ word: this.data.words[Math.floor(Math.random() * this.data.words.length)] })
    }

    showAnswer = e => {
        this.setState({ showAnswer: true })
    }

    pass = e => { this.answer(true) }
    fail = e => { this.answer(false) }

    answer(pass) {
        console.log(pass)
        //fix if true remove word from array

        var request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
                console.log(JSON.parse(request.responseText));

        };
        request.open('POST', 'http://localhost:3001/api/song/review', true);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
        request.send(JSON.stringify({
            word: this.state.word._id,
            next: pass ? new Date().setDate(new Date().getDate() + 1) : new Date(),//fix calculate Date properly
            score: pass ? 1 : 0//fix calculate score properly
        }));


        this.shuffle()
        this.setState({ showAnswer: false })
    }

    render() {
        if (!this.state?.word)
            return <h1>data loading</h1>

        //if undefined, display no words to review

        return <div>
            <h1>{this.state.word.word}</h1>
            <p>{this.state.word.meanings}</p>

            {
                !this.state.showAnswer &&
                <button onClick={this.showAnswer}>show answer</button>
            }
            {
                this.state.showAnswer &&
                <button onClick={this.pass}>pass</button>
            }
            {
                this.state.showAnswer &&
                <button onClick={this.fail}>fail</button>
            }
        </div>
    }
}

export default Review