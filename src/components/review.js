import React from 'react';
import { Globals } from '../Global';

class Review extends React.Component {

    reviewCount = 9;//check: 9 for testing, should start from 0
    wordsReviewing = []//splice of words to review
    wordsToReview = [];//list of words that has been reviewed at least once
    wordsNew = [];//list of words that have never been reviewed
    shuffleNewWordsOnly = false;//determines if the user is reviewing known or new words
    intervals = [//cards use the index of their current score, then the score is increased
        10,//10m
        90,//1.5hs
        1440,//1 day
        1440 * 7,//1 week
        1440 * 30,//1 month
        1440 * 90,//3 month
        1440 * 180,//6 month
    ];//in minutes

    nexts = [];//array of how many words will become available for review in each day
    types = [];//verb, noun, etc


    constructor(props) {//sets wordsToReview, wordsNew, nexts, types
        super(props);
        this.state = { reviewCountLimit: 10 };

        this.PrepareData();
    }

    PrepareData() {//consider: changing the name of the function, initializing variables
        Globals.Review = this;//reference needed to stop review when clicking the <Link> button

        this.types = [];
        this.nexts = [];
        this.wordsToReview = [];
        this.wordsNew = [];
        this.reviewCount = 0;

        Globals.$words?.forEach(word => {
            const stat = Globals.$stats.score?.find(stat => stat.word === word.word);
            if (stat) {
                if (stat.next < new Date()) {
                    this.wordsToReview.push(word);
                    this.types.push(...Object.keys(word.meanings));
                }
                else {
                    const next = this.nexts.find(next => next.next === stat.next.toLocaleDateString().split('T')[0]);

                    if (next) {
                        next.amount++;
                    }
                    else {
                        this.nexts.push({
                            next: stat.next.toLocaleDateString().split('T')[0],
                            amount: 1
                        })
                    }
                }
            }
            else {
                this.wordsNew.push(word);
                this.types.push(...Object.keys(word.meanings))
            }

        })
        this.types = [...new Set(this.types)];//removes duplicates from array //consider: could i simply use a set from the start?
        console.log(this.types);
        console.log(this.nexts);
        //check: sort arrays of words so splice always takes the oldest or most used ones
        //consider: sort this.nexts by date, and this.types alphabetically
    }

    shuffle() {
        //state WORD defines if the user is reviewing or not
        this.setState({ showAnswer: false });
        if (this.wordsReviewing.length)
            this.setState({ word: this.wordsReviewing[Math.floor(Math.random() * this.wordsNew.length)] });
        else {
            this.setState({ word: undefined });
            this.PrepareData();
        }
    }


    answer(pass) {
        if (pass) {
            this.wordsReviewing = this.wordsReviewing.filter(word => word !== this.state.word);

            const stat = Globals.$stats.score.find(stat => stat.word === this.state.word.word)

            if (stat) {
                console.log('has stat');
                stat.next = new Date();
                stat.next.setMinutes(stat.next.getMinutes() + this.intervals[stat.score]);
                stat.score++;
            }
            else {
                console.log('does not has stat');
                const next = new Date();
                next.setMinutes(next.getMinutes() + this.intervals[0]);

                Globals.$stats.score.push({
                    word: this.state.word.word,
                    score: 1,
                    next
                })
            }
        }
        else {
            const stat = Globals.$stats.score.find(stat => stat.word === this.state.word.word);
            stat.score = stat.score > 0 ? stat.score - 1 : 0;
            //consider: should i remove from list now or set next?
            //consider: each review session could have an ID, here i could remove the word and set a timeout for a few minutes, if the review session is the same, add the word again
        }


        const reviewed = Globals.$stats.reviewed.find(reviewed => reviewed.date === new Date().toLocaleDateString());

        if (reviewed) {
            if (!reviewed.reviewed.includes(this.state.word.word)) {
                reviewed.reviewed.push(this.state.word.word);

                this.statsPOST(reviewed);
                console.log(Globals.$stats.reviewed);
            }
        }
        else {
            const reviewed = {
                date: new Date().toLocaleDateString(),
                reviewed: [this.state.word.word]
            };
            Globals.$stats.reviewed.push(reviewed);

            this.statsPOST(reviewed);
            console.log(Globals.$stats.reviewed);
        }

        localStorage.setItem('stats', JSON.stringify(Globals.$stats));

        this.shuffle();
    }


    statsPOST(reviewed) {
        /* unused variable console warning don't like
        const payload = {
            reviewed: reviewed.reviewed.length
        };*/

        //fix: send request to backend
    }


    startReview(shuffleNewWordsOnly) {
        this.shuffleNewWordsOnly = shuffleNewWordsOnly;

        if (shuffleNewWordsOnly)
            this.wordsReviewing = this.wordsNew.slice(0, this.state.reviewCountLimit);
        else
            this.wordsReviewing = this.wordsToReview.slice(0, this.state.reviewCountLimit);

        this.shuffle();
    }


    render() {
        return <>
            {
                this.state.word === undefined &&
                <>
                    <div className=''>
                        <button onClick={() => this.setState({ reviewCountLimit: this.state.reviewCountLimit - 10 })} disabled={this.state.reviewCountLimit === 10}>{'<'}</button>
                        <input disabled={true} value={this.state.reviewCountLimit}></input>
                        <button onClick={() => this.setState({ reviewCountLimit: this.state.reviewCountLimit + 10 })}>{'>'}</button>
                    </div>
                    <p>{this.wordsToReview.length} words to review</p>
                    <p>{this.wordsNew.length} new words</p>
                </>
            }
            {
                this.state.word !== undefined &&
                <p>{this.wordsReviewing.length} words left on this session</p>
            }
            {
                this.state?.word === undefined &&
                <>
                    <div className='review-options-typebuttons'>
                        {
                            this.types.map(type =>
                                <button className='review-options-typebuttons-button' key={type}>{type}</button>
                            )
                        }
                    </div>

                    <br />

                    <p>filter of min times repeated</p>

                    <br />
                    <br />

                    <div className='review-options-startbuttons'>
                        <button className='review-options-startbuttons-button' onClick={() => this.startReview(true)} disabled={!this.wordsNew.length}>Learn new words</button>

                        <button className='review-options-startbuttons-button' onClick={() => this.startReview(false)} disabled={!this.wordsToReview.length}>Review known words</button>
                    </div>
                </>
            }
            {
                this.state?.word !== undefined &&
                <>
                    <h1>{this.state?.word?.word}</h1>
                    {
                        //consider: add references/examples to this word from songs
                        Globals.$stats.score.find(stat => stat.word === this.state.word.word) !== undefined &&
                        <>
                            <button onClick={() => this.setState({ showAnswer: true })}>show answer</button>
                            {
                                this.state?.showAnswer &&
                                <>
                                    <br />
                                    <button onClick={() => this.answer(false)}>fail</button>
                                    <button onClick={() => this.answer(true)}>pass</button>

                                    <div>
                                        <p>{this.state.word.type}</p>
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
                        </>
                    }
                    {
                        Globals.$stats.score.find(stat => stat.word === this.state.word.word) === undefined &&
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
                </>
            }
        </>
    }
}

export default Review