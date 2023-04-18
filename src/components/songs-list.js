import React from 'react'
import { Globals } from '../Global'
import { Link } from 'react-router-dom'

export default function SongsList({ data: { setSelectedSong } }) {


    // iterates each song, and sets 'song.knownWords', 'song.wordsToReview', 'song.newWords', and 'song.totalWords'
    return Globals.$songs.map(song => {
        song.knownWords = song.wordsToReview = song.newWords = song.totalWords = 0
        const wordsFound = []
        const date = new Date()



        // sets some basic statistics about each song to display the progress bar and data
        song.lines.forEach(line => {
            line.structures?.forEach(structure => {
                structure.words?.forEach(word => {

                    // if the word has no ID (meaning it is not in the dictionary), or it was already added to list
                    if (!word.word || wordsFound.includes(word.word))
                        return

                    wordsFound.push(word.word)

                    // tries to gets the localStorage stat of this word
                    const stat = Globals.$stats.score?.find(stat => stat.word === word.word)

                    if (!stat)
                        song.newWords++ // word has no stat therefore it was never reviewed before
                    else {
                        if (stat.score > 3)
                            song.knownWords++
                        if (new Date(stat.next) < date)
                            song.wordsToReview++
                    }
                })
            })
        })

        song.totalWords = wordsFound.length



        // returns each individual song container
        return <div key={song.title} className='song-container'>
            <div>
                <Link to='/review' state={{ song }} className='song-container-review-button'>Review</Link>
                <h2 onClick={() => setSelectedSong(song)}>{song.title}</h2>
            </div>

            <p>{song.knownWords + ' / ' + song.totalWords}</p>

            <div className='progress-bar'>
                <div style={{ width: `${song.knownWords / song.totalWords * 100}%` }}></div>
            </div>
        </div >
    })
}