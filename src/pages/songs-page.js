import SongsList from '../components/songs-list';
import SongsDetails from '../components/songs-details';

import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'
import { useLocation } from 'react-router-dom'


export default function ReviewPage() {

    const [selectedSong, setSelectedSong] = useState(undefined)


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