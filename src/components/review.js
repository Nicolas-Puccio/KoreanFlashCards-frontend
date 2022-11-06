import React from 'react';
import Globals from '../Global';

class Review extends React.Component {

    wordsToReview = [];
    intervals = [10, 60, 24 * 60, 24 * 60 * 7];//in minutes

    componentDidMount() {
        this.wordsToReview = Globals.$words.filter(word => {
            const stat = Globals.$stats.find(stat => stat.word === word.word)
            if (stat) {
                return new Date(stat.next) < new Date();
                //this data could be used to build a graph or tell the user at what time he has words to review
            }
            return true;
        })

        console.log(this.wordsToReview);
        this.shuffle()
    }

    shuffle() {
        this.setState({ showAnswer: false })
        this.setState({ word: this.wordsToReview[Math.floor(Math.random() * this.wordsToReview.length)] })
        console.log(this.wordsToReview[Math.floor(Math.random() * this.wordsToReview.length)])
    }

    answer(pass) {
        if (pass) {
            this.wordsToReview = this.wordsToReview.filter(word => word !== this.state.word)
            const stat = Globals.$stats.find(stat => stat.word === this.state.word.word)
            if (stat) {
                console.log('has stat')
                stat.next = new Date();
                stat.next.setMinutes(stat.next.getMinutes() + this.intervals[stat.score]);
                stat.score++;
            }
            else {
                console.log('does not has stat')
                const next = new Date();
                next.setMinutes(next.getMinutes() + this.intervals[0]);

                Globals.$stats.push({
                    word: this.state.word.word,
                    score: 1,
                    next
                })
                console.log(Globals.$stats)
            }
        }
        else {
            const stat = Globals.$stats.find(stat => stat.word === this.state.word.word)
            if (stat) {
                console.log('has stat')
                stat.score = 0;//fix should only reduce 1 or 2 numbers
            }
            else {
                console.log('WOW hold on there buddy')
            }
        }

        localStorage.setItem('stats', JSON.stringify(Globals.$stats))
        this.shuffle()
    }


    render() {
        if (Globals.$words.length === 0)
            return <h1>data must be queried from the db</h1>

        return <div>
            {
                this.state?.word !== undefined &&
                <div>
                    <h1>{this.state?.word?.word}</h1>
                    {
                        //fix maybe i could add references to this word from songs
                        Globals.$stats.find(stat => stat.word === this.state.word) !== undefined &&
                        <>
                            <button onClick={() => this.setState({ showAnswer: true })}>show answer</button>
                            {
                                this.state?.showAnswer &&
                                <>
                                    <button onClick={() => this.answer(false)}>fail</button>
                                    <button onClick={() => this.answer(true)}>pass</button>

                                    <div>
                                        <p>{this.state.word.type}</p>
                                        <ul>
                                            {
                                                this.state.word.meanings.map((meaning, index) => <li key={index}>{meaning}</li>)
                                            }
                                        </ul>
                                    </div>
                                </>
                            }
                        </>
                    }
                    {
                        Globals.$stats.find(stat => stat.word === this.state.word) === undefined &&
                        <>
                            <button onClick={() => this.answer(true)}>ok</button>

                            <div>
                                <ul>
                                    {
                                        Object.keys(this.state.word.meanings).map((key) =>
                                            <li key={key}>{key}: {this.state.word.meanings[key]}</li>
                                        )
                                    }
                                </ul>
                            </div>

                        </>
                    }
                </div>
            }
        </div>
    }
}

export default Review