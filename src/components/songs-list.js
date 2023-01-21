import React, { useEffect } from 'react';
import { Globals } from '../Global';
import { Link } from 'react-router-dom';

export default function SongsList({ data }) {



    useEffect(() => {

    }, [])




    return Globals.$songs.map((song) => {
        song.known = song.review = song.new_ = song.total = 0;
        const wordsFound = []
        const date = new Date()

        song.lines.forEach(line => {
            line.structures?.forEach(structure => {
                structure.words?.forEach(word => {
                    if (!word.word || wordsFound.includes(word.word))//word has no ID on db or //already added
                        return;

                    wordsFound.push(word.word);
                    song.total++;
                    const stat = Globals.$stats.score?.find(stat => stat.word === word.word)

                    if (!stat)
                        song.new_++;
                    else {
                        if (stat.score > 4)
                            song.known++;
                        if (new Date(stat.next) < date)
                            song.review++;
                    }
                })
            })
        })

        return <div key={song.title} className='song-container'>
            <div style={{ width: '100%' }}>
                <Link to='/review' state={{ song }} className='song-container-review-button'>Review</Link>
                <h2 className='song-container-h3' onClick={() => data.setSelectedSong(song)}>{song.title}</h2>
            </div>
            <p className='song-container-p'>{song.known + ' / ' + song.total}</p>
            {
                song.known > 0 &&
                <div className='progress-bar'>
                    <div style={{ width: `${song.known / song.total * 100}%` }} className='progress-bar-progress'></div>
                </div>
            }
        </div >
    })
}