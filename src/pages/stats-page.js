import React, { useEffect, useState } from 'react'
import { Globals } from '../Global'


//fix: comment file
export default function StatsPage({ data: { user } }) {

    const [leaderboards, setLeaderboards] = useState([])

    useEffect(() => {
        //-this is being called twice
        fetch('http://localhost:3001/api/user/leaderboard')
            .then(async res => {
                await res.json().then(json => {
                    if (res.status !== 200)
                        alert(json.message)
                    else {
                        json.forEach(json => json.data.sort((a, b) => b.reviewed - a.reviewed))
                        setLeaderboards(json.reverse())
                    }
                })
            })
            .catch(err => console.log(err))
    }, [])


    function randomizeStats() { // only sets score, not reviewed, used for testing
        Globals.$stats =  []

        Globals.$words.forEach(word => {
            const next = new Date()
            next.setDate(next.getDate() + Math.floor(Math.random() * 4))

            Globals.$stats.push({
                score: Math.floor(Math.random() * 5) + 1,
                word: word.word,
                next
            })
        })

        localStorage.setItem('stats', JSON.stringify(Globals.$stats))
    }


    return <>
        {
            !user &&
            <p>log in to appear on the leaderboard</p>
        }

        <h2>My reviews</h2>
        {
            //check: should be a graph rather than a list
            //-this will be received in a fetch call
            
        }

        <br />
        <br />

        <h2>Leaderboard</h2>
        {
            leaderboards.map((leaderboard, index) => <div key={index} className='leaderboard-container'>
                <h3>{leaderboard.date.split('T')[0]}</h3>
                {
                    leaderboard.data.map((data, index) =>
                        <p className={data.user === user?.username ? 'leaderboard-you' : ''} key={`p${index}`}>{data.user} - {data.reviewed}{data.user === user?.username ? '       you' : ''}</p>
                    )
                }
            </div>)
        }
        {
            leaderboards.length === 0 &&
            <p>No leaderboard available</p>
        }

        <br />
        <br />
        <br />

        <button onClick={randomizeStats}>Randomize stats</button>
    </>
}
