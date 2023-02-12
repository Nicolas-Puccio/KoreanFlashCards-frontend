import React, { useEffect, useState } from 'react'
import { Globals } from '../Global'


//fix: comment file
export default function StatsPage({ data: { user } }) {

    const [leaderboards, setLeaderboards] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/user/stats')
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

    return <>
        {
            !user &&
            <p>log in to appear on the leaderboard</p>
        }

        <h2>My reviews</h2>
        {
            //check: should be a graph rather than a list
            Globals.$stats[Globals.$username].reviewed.map((reviewed, index) =>
                <p key={index}>{reviewed.date} - {reviewed.reviewed.length}</p>
            )
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
    </>
}
