import React, { useEffect, useState } from 'react'
import { Globals } from '../Global'


//fix: comment file
export default function StatsPage() {




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
        <h2>My reviews</h2>
        {
            //check: should be a graph rather than a list
            //-this will be received in a fetch call
            
        }

        <br />
        <br />


        <button onClick={randomizeStats}>Randomize stats</button>
    </>
}
