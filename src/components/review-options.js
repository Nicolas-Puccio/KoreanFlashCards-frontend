import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'
import { useLocation } from 'react-router-dom'

export default function ReviewOptions({ data }) {

    const location = useLocation()
    const [reviewCountLimit, setReviewCountLimit] = useState(10)
    const [typesSelected, setTypesSelected] = useState([])
    const [selectedSong, setSelectedSong] = useState(location.state ? location.state.song : undefined)


    const [wordsToReview, setWordsToReview] = useState([])//list of words that has been reviewed at least once
    const [wordsNew, setWordsNew] = useState([])//list of words that have never been reviewed
    const [wordsToReviewFiltered, setWordsToReviewFiltered] = useState([])//list of words that apply to selected filters, this will be spliced into WordsReviewing
    const [wordsNewFiltered, setWordsNewFiltered] = useState([])//list of words that apply to selected filters, this will be spliced into WordsReviewing


    const [nexts, setNexts] = useState([])//array of how many words will become available for review in each day
    const [types, setTypes] = useState([])//verb, noun, etc

    const [advancedSettings, setAdvancedSettings] = useState(false)


    useEffect(() => {
        console.log('useEffect: ', selectedSong)


        let auxTypes = []
        let auxNexts = []
        let auxWordsToReview = []
        let auxWordsNew = []


        //process each word
        Globals.$words?.forEach(word => {
            //if there is a selected song, check if it contains the word
            if (selectedSong) {
                let found = false//bool flag

                for (let i = 0; i < selectedSong.lines.length; i++) {
                    const line = selectedSong.lines[i]
                    for (let j = 0; j < line.structures?.length; j++) {
                        for (let y = 0; y < line.structures[j].words.length; y++) {
                            if (word.word === line.structures[j].words[y].word)
                                found = true
                        }
                    }
                }
                if (!found)
                    return
            }


            const stat = Globals.$stats.score?.find(stat => stat.word === word.word)

            if (stat) {
                if (stat.next < new Date()) {
                    auxWordsToReview.push(word)
                    auxTypes.push(...Object.keys(word.meanings))
                }
                else {
                    const next = auxNexts.find(next => next.next === stat.next.toLocaleDateString().split('T')[0])

                    if (next) {
                        next.amount++
                    }
                    else {
                        auxNexts.push({
                            next: stat.next.toLocaleDateString().split('T')[0],
                            amount: 1
                        })
                    }
                }
            }
            else {
                auxWordsNew.push(word)
                auxTypes.push(...Object.keys(word.meanings))
            }
        })

        setTypes([...new Set(auxTypes)])//removes duplicates from array //consider: could i simply use a set from the start?
        setTypesSelected([...new Set(auxTypes)])

        auxNexts.sort((a, b) => a.next - b.next)
        setNexts(auxNexts)

        setWordsNew(auxWordsNew)
        setWordsToReview(auxWordsToReview)

        //FIX
        //this.setWordsFiltered(this.types);//consider: store filters on localStorage or config
        //check: sort arrays of words so splice always takes the oldest or most used ones
        //consider: sort this.types alphabetically
    }, [selectedSong])

    useEffect(() => {
        console.log(types)
        //check: if a word has 2 types, and it is the only one of a certain type, when you deselect this type nothing happens, as the word will still be available because of the other type, therefore the button does nothing, what should i do?

        //consider: should i also filter this.nexts?
        setWordsToReviewFiltered(wordsToReview.filter(word => {
            if (Object.keys(word.meanings).filter(type => typesSelected.includes(type)).length > 0) {
                if (!selectedSong)
                    return true
                //there is a selected song
                for (let i = 0; i < selectedSong.lines.length; i++) {
                    for (let j = 0; j < selectedSong.lines[i].structures?.length; j++) {
                        for (let y = 0; y < selectedSong.lines[i].structures[j].words.length; y++) {
                            if (word.word === selectedSong.lines[i].structures[j].words[y].word)
                                return true
                        }
                    }
                }
            }
            return false//consider: can this line be removed?
        }))

        setWordsNewFiltered(wordsNew.filter(word => {
            return true//fix: finish this
        }))
    }, [types, typesSelected, selectedSong, wordsNew, wordsToReview])//had to add all these dependencies to avoid error, i guess i could have just disabled



    function selectType(type) {
        let auxTypesSelected;


        if (typesSelected.includes(type)) {
            if (typesSelected.length === 1) {
                //if you want to deselect the last one selected, select all instead
                auxTypesSelected = types.slice(0)
            }
            else
                auxTypesSelected = typesSelected.filter(type2 => type2 !== type)
        }
        else
            auxTypesSelected = [...typesSelected, type]

        setTypesSelected(auxTypesSelected)
    }


    function startReview(newWords) {
        data.setWordsToReview(newWords ? wordsNewFiltered.slice(0, reviewCountLimit) : wordsToReviewFiltered.slice(0, reviewCountLimit))
    }

    return (
        <>
            <select onChange={e => {
                setSelectedSong(Globals.$songs.find(song => song.title === e.target.value))
            }} defaultValue={location.state?.song.title ?? 'All songs'}>
                <option>All songs</option>
                {
                    Globals.$songs.map((song, index) =>
                        <option key={index}>{song.title}</option>
                    )
                }
            </select>


            <br /><br />


            <div className='review-count-buttons-container'>
                <button onClick={() => setReviewCountLimit(reviewCountLimit - 10)} disabled={reviewCountLimit === 10}>{'<'}</button>
                <input disabled={true} value={reviewCountLimit}></input>
                <button onClick={() => setReviewCountLimit(reviewCountLimit + 10)} disabled={reviewCountLimit === 100}>{'>'}</button>
            </div>


            <p>{wordsToReview.length} words to review</p>
            <p>{wordsToReviewFiltered.length} words to review after filters</p>
            <p>{wordsNew.length} new words</p>
            <p>{wordsNewFiltered.length} new words after filters</p>


            <div className='review-options-typebuttons'>
                {
                    types.map(type =>
                        <button className={typesSelected.includes(type) ? 'review-options-typebuttons-button' : 'review-options-typebuttons-button-deselected'}
                            onClick={() => { selectType(type) }}
                            key={type} >{type}</button>
                    )
                }
            </div>


            <br /><br />


            <div className='review-options-startbuttons'>
                <button className='review-options-startbuttons-button' onClick={() => startReview(true)} disabled={!wordsNewFiltered.length}>Learn new words</button>
                <button className='review-options-startbuttons-button' onClick={() => startReview(false)} disabled={!wordsToReviewFiltered.length}>Review known words</button>
            </div>


            <br /><br /><br />


            <button onClick={() => setAdvancedSettings(!advancedSettings)}>Advanced Settings</button>
            {
                advancedSettings &&
                <div>
                    {
                        //check: also set intervals here
                        nexts.map((next, index) => <p key={index}>{next.next} - {next.amount}</p>)
                    }
                    <p>filter of min times repeated</p>
                </div>
            }
        </>
    )
}