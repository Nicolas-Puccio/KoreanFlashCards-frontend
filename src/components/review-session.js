import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'

export default function ReviewOptions({ data }) {

    const [showAnswer, setShowAnswer] = useState(false)
    const [word, setWord] = useState(data.wordsToReview[0])


    const intervals = [//cards use the index of their current score, then the score is increased
        10,//10m
        90,//1.5hs
        1440,//1 day
        1440 * 7,//1 week
        1440 * 30,//1 month
        1440 * 90,//3 month
        1440 * 180,//6 month
    ]//in minutes


    //check: is this ok?
    useEffect(() => {
        shuffle()
        // eslint-disable-next-line
    }, [])


    function shuffle() {
        setShowAnswer(false)

        if (data.wordsToReview.length)
            setWord(data.wordsToReview[Math.floor(Math.random() * data.wordsToReview.length)])
        else {
            data.setWordsToReview([])
        }
    }


    function answer(pass) {
        if (pass) {
            data.wordsToReview = data.wordsToReview.filter(word2 => word2 !== word)

            const stat = Globals.$stats.score.find(stat => stat.word === word.word)

            if (stat) {
                console.log('has stat')
                stat.next = new Date()
                stat.next.setMinutes(stat.next.getMinutes() + intervals[stat.score])
                stat.score++
            }
            else {
                console.log('does not has stat')
                const next = new Date()
                next.setMinutes(next.getMinutes() + intervals[0])

                Globals.$stats.score.push({
                    word: word.word,
                    score: 1,
                    next
                })
            }
        }
        else {
            const stat = Globals.$stats.score.find(stat => stat.word === word.word)
            stat.score = stat.score > 1 ? stat.score - 2 : 0//consider: -3
            //consider: should i remove from list now or set next?
            //consider: each review session could have an ID, here i could remove the word and set a timeout for a few minutes, if the review session is the same, add the word again
        }


        const reviewed = Globals.$stats.reviewed.find(reviewed => reviewed.date === new Date().toLocaleDateString())

        if (reviewed) {
            if (!reviewed.reviewed.includes(word.word)) {
                reviewed.reviewed.push(word.word)

                fetchStats(reviewed)
                console.log(Globals.$stats.reviewed)
            }
        }
        else {
            const reviewed = {
                date: new Date().toLocaleDateString(),
                reviewed: [word.word]
            }
            Globals.$stats.reviewed.push(reviewed)

            fetchStats(reviewed)
            console.log(Globals.$stats.reviewed)
        }

        localStorage.setItem('stats', JSON.stringify(Globals.$stats))

        shuffle()
    }



    function fetchStats(reviewed) {
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
                    alert(json.message)
                else {
                    console.log('stats good')
                }
            })
        }).catch(err => console.error(err))
    }


    return (
        <>
            <p>{data.wordsToReview.length} words left on this session</p>

            {
                word !== undefined &&
                <>
                    <h1>{word.word}</h1>

                    {
                        //consider: add references/examples to this word from songs
                        Globals.$stats.score.find(stat => stat.word === word.word) !== undefined && //word has score
                        <>
                            <button onClick={() => setShowAnswer(true)}>show answer</button>
                            {
                                showAnswer &&
                                <>
                                    <br />
                                    <button onClick={() => answer(false)}>fail</button>
                                    <button onClick={() => answer(true)}>pass</button>


                                    <div>
                                        <p>{word.type}</p>
                                        <ul>
                                            {
                                                Object.keys(word.meanings).map((key) =>
                                                    <li key={key}>{key}: {word.meanings[key]}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </>
                            }
                        </>
                    }


                    {
                        Globals.$stats.score.find(stat => stat.word === word.word) === undefined && //no score
                        <>
                            <button onClick={() => answer(true)}>ok</button>


                            <div>
                                <ul>
                                    {
                                        Object.keys(word.meanings).map((key) =>
                                            <li key={key}>{key}: {word.meanings[key]}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}