import SongsList from '../components/songs-list'
import SongsDetails from '../components/songs-details'
import { Globals } from '../Global'
import React, { useState, useEffect } from 'react'



export default function SongsPage() {

    // song object from db
    const [selectedSong, setSelectedSong] = useState(undefined)



    useEffect(() => {
        // sends the setter to Globals so navbar can use it to deselect the song when clicking the home button
        Globals.setSelectedSong = setSelectedSong
    }, [])



    return (
        <>
            {
                selectedSong === undefined && <SongsList data={{ setSelectedSong }} />
            }
            {
                selectedSong !== undefined && <SongsDetails data={{ selectedSong }} />
            }
        </>
    )
}