import SongsList from '../components/songs-list'
import SongsDetails from '../components/songs-details'
import Global from '../Global'
import React, { useState, useEffect } from 'react'
import '../style/songs-page.css'


export default function SongsPage() {

    // song object from db
    const [selectedSong, setSelectedSong] = useState(undefined)



    useEffect(() => {
        // sends the setter to Globals so navbar can use it to deselect the song when clicking the home button
        Global.setSelectedSong = setSelectedSong
    }, [])



    return (
        <>
            {
                selectedSong === undefined && <SongsList data={{ setSelectedSong }} />
            }
            {
                selectedSong !== undefined && <SongsDetails data={{ selectedSong }} />//check: add setter too? for back button or something
            }
        </>
    )
}