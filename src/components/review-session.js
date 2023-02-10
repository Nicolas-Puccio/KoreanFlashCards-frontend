import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'


//fix: comment file
export default function ReviewSession({ data: { wordsReviewing, setWordsReviewing, user } }) {

    // shows the word definition when clicking the show button or automatially if the word is new
    const [showAnswer, setShowAnswer] = useState(false)

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

        if (wordsReviewing.length)
            setWord(wordsReviewing[Math.floor(Math.random() * wordsReviewing.length)])
        else {
            setWordsReviewing([])
        }
    }


    // shuffle is called automatically every time wordsReviewing changes, meaning it is called after a word is removed from the array by answer(true)
    useEffect(() => { shuffle() }, [wordsReviewing])



    function answer(pass) {
        if (pass) {
            setWordsReviewing(wordsReviewing.filter(word2 => word2 !== word))

            const stat = Globals.$stats[Globals.$username].score.find(stat => stat.word === word.word)

            if (stat) {
                stat.next = new Date()
                stat.next.setMinutes(stat.next.getMinutes() + intervals[stat.score])
                stat.score++
            }
            else {
                const next = new Date()
                next.setMinutes(next.getMinutes() + intervals[0])

                Globals.$stats[Globals.$username].score.push({
                    word: word.word,
                    score: 1,
                    next
                })
            }
        }
        else {
            // shuffle is called manually here because wordsReviewing did not change
            shuffle()

            const stat = Globals.$stats[Globals.$username].score.find(stat => stat.word === word.word)
            stat.score = stat.score > 1 ? stat.score - 2 : 0//consider: -3
            //consider: should i remove from list now or set next?
            //consider: each review session could have an ID, here i could remove the word and set a timeout for a few minutes, if the review session is the same, add the word again
        }


        const reviewed = Globals.$stats[Globals.$username].reviewed.find(reviewed => reviewed.date === new Date().toLocaleDateString())

        if (reviewed) {
            if (!reviewed.reviewed.includes(word.word)) {
                reviewed.reviewed.push(word.word)

                fetchStats(reviewed)
            }
        }
        else {
            const reviewed = {
                date: new Date().toLocaleDateString(),
                reviewed: [word.word]
            }
            Globals.$stats[Globals.$username].reviewed.push(reviewed)

            fetchStats(reviewed)
        }

        localStorage.setItem('stats', JSON.stringify(Globals.$stats))
    }



    function fetchStats(reviewed) {
        //should only do so if user is logged in
        if (!user)
            return


        fetch(`http://localhost:3001/api/user/stats`, {
            method: "POST",
            body: JSON.stringify({ reviewed: reviewed.reviewed.length }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        }).then(res => {
            res.json().then(json => {
                if (res.status !== 200)
                    console.log(json)
            })
        }).catch(err => console.error(err))
    }


    //consider: add references/examples to this word from songs
    return <>
        <p>{wordsReviewing.length} words left on this session</p>


        <h1>{word.word}</h1>


        {
            // word has no score
            Globals.$stats[Globals.$username].score.find(stat => stat.word === word.word) === undefined &&

            <>
                <button onClick={() => answer(true)}>ok</button>


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
            Globals.$stats[Globals.$username].score.find(stat => stat.word === word.word) !== undefined &&

            <>
                <button onClick={() => setShowAnswer(true)}>show answer</button>
                {
                    showAnswer &&

                    <>
                        <br />
                        <button onClick={() => answer(false)}>fail</button>
                        <button onClick={() => answer(true)}>pass</button>


                        <p>{word.type}</p>
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