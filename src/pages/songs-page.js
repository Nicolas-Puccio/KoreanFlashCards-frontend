import SongsList from '../components/songs-list'
import SongsDetails from '../components/songs-details'
import { Globals } from '../Global';
import React, { useState, useEffect } from 'react'


export default function ReviewPage() {

    const [selectedSong, setSelectedSong] = useState(undefined)


    useEffect(() => {
        Globals.setSelectedSong = setSelectedSong
    }, [])


    return (
        <>
            {
                selectedSong === undefined && <SongsList data={{ setSelectedSong }} />
            }
            {
                selectedSong !== undefined && <SongsDetails data={{ selectedSong }} />//check add setter too? for back button or something
            }
        </>
    )
}