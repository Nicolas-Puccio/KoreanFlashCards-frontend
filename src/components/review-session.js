import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'


export default function ReviewSession({ data: { wordsReviewing, setWordsReviewing } }) {

    // shows the word definition when clicking the show button or automatially if the word is new
    const [showAnswer, setShowAnswer] = useState(false)
    const [disableInput, setDisableInput] = useState(true)

    // word currently being reviewed, defaults to the 1st word of the array
    const [word, setWord] = useState(wordsReviewing[0])


    // srs intervals in minutes
    // cards use the index of their current score, then the score is increased
    const intervals = [
        10,// 10m
        90,// 1.5h
        1440,// 1 day
        1440 * 7,// 1 week
        1440 * 30,// 1 month
        1440 * 90,// 3 month
        1440 * 180,// 6 month
    ]


    /**
     * hides word definition and sets a new word
     * 
     * if no words left, sets state of parent component which will remove this component and replace with review-options
     */
    function shuffle() {
        setShowAnswer(false)

        setTimeout(() => setDisableInput(false), 1000)

        if (wordsReviewing.length)
            setWord(wordsReviewing[Math.floor(Math.random() * wordsReviewing.length)])
        else
            setWordsReviewing([])
    }



    // shuffle is called automatically every time wordsReviewing changes, meaning it is called after a word is removed from the array by answer(true)
    useEffect(() => {
        shuffle()
        // eslint-disable-next-line
    }, [wordsReviewing])



    /**
     * sets word stats and reviewed object
     * 
     * sends post request to backend to update leaderboard
     * 
     * stores stats on localStorage
     * 
     * called by the 'ok', 'pass', and 'fail' buttons
     * 
     * @param {boolean} pass did the user get the word correctly
     */
    async function answer(pass, alreadyKnow) {

        setDisableInput(true)
        // user got the word right

        let stat = Globals.$stats.find(stat => stat.word === word.word)


        if (pass) {
            // removes the current word from the list of words to review
            setWordsReviewing(wordsReviewing.filter(word2 => word2 !== word))

            // sets 'stat.next' and 'stat.score'
            if (stat) {
                stat.next = new Date()
                stat.next.setMinutes(stat.next.getMinutes() + intervals[stat.score])
                stat.score++
            }

            // creates stat for this word
            else {
                const next = new Date()
                next.setMinutes(next.getMinutes() + (alreadyKnow ? intervals[3] : intervals[0]))// if the user already knows the word add interval at [3], if not, add [0]

                stat = {
                    word: word.word,
                    score: alreadyKnow ? 4 : 1, // if the user already knows the word add an extra score
                    next
                }

                Globals.$stats.push(stat)

                //fix: this triggers the showAnswer part of the review for a few ms until the state is updated, causing a slight but noticeable flickering in text
            }
        }

        // user did not get the word right
        else {
            // shuffle is called manually here because wordsReviewing did not change
            shuffle()

            stat.score = stat.score > 1 ? stat.score - 2 : 0//consider: -3
            //consider: should i remove from list now or set next?
            //consider: each review session could have an ID, here i could remove the word and set a timeout for a few minutes, if the review session is the same, add the word again
        }




        


        // stores stats on localStorage
        localStorage.setItem('stats', JSON.stringify(Globals.$stats))
    }




    //consider: add references/examples to this word from songs
    return <>
        <p>{wordsReviewing.length} words left on this session</p>


        <h1>{word.word}</h1>


        {
            // word has no score
            Globals.$stats.find(stat => stat.word === word.word) === undefined &&

            <>
                <button disabled={disableInput} onClick={() => answer(true)}>ok</button>
                <button disabled={disableInput} onClick={() => answer(true, true)}>I already know this word</button>


                <ul>
                    {
                        Object.keys(word.meanings).map(key =>
                            <li key={key}>{key}: {word.meanings[key]}</li>
                        )
                    }
                </ul>
            </>
        }
        {
            //word has score
            Globals.$stats.find(stat => stat.word === word.word) !== undefined &&

            <>
                <button onClick={() => setShowAnswer(true)}>show answer</button>
                {
                    showAnswer &&

                    <>
                        <br />
                        <button onClick={() => answer(false)}>fail</button>
                        <button onClick={() => answer(true)}>pass</button>


                        <ul>
                            {
                                Object.keys(word.meanings).map(key =>
                                    <li key={key}>{key}: {word.meanings[key]}</li>
                                )
                            }
                        </ul>
                    </>
                }
            </>
        }

    </>
}