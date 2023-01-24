import React, { useEffect, useState } from 'react';
import { Globals } from '../Global';

export default function StatsPage() {

    const [leaderboards, setLeaderboards] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/user/stats', { credentials: 'include' })
            .then(async res => {
                await res.json().then(json => {
                    if (res.status !== 200)
                        alert(json.message)
                    else {
                        json.forEach(json => json.data.sort((a, b) => b.reviewed - a.reviewed))
                        setLeaderboards(json)
                        console.log(json)
                    }
                })
            })
            .catch(err => console.log(err))
    }, [])

    return <>
        <h2>My reviews</h2>
        {
            Globals.$stats.reviewed.map((reviewed, index) =>
                <p key={index}>{reviewed.date} - {reviewed.reviewed.length}</p>
            )
        }

        <br />
        <br />

        <h2>Leaderboard</h2>
        {
            leaderboards.map((leaderboard, index) => {
                return (<div key={index}>
                    <h3>{leaderboard.date.split('T')[0]}</h3>
                    {
                        leaderboard.data.map((data, index) =>
                            <p key={`p${index}`}>{data.user} - {data.reviewed}</p>
                        )
                    }
                    <br />
                </div>)
            })
        }
    </>
}
