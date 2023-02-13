import React, { useState, useEffect } from 'react'
import { Globals } from '../Global'
import { useLocation } from 'react-router-dom'

export default function ReviewOptions({ data: { setWordsReviewing } }) {

    // SongsList review button sends the song to review inside location.state
    // this is used for the default value of the song <select>
    const location = useLocation()
    const [selectedSong, setSelectedSong] = useState(location.state ? location.state.song : undefined)


    // how many words to review per session
    const [reviewCountLimit, setReviewCountLimit] = useState(10)


    // types are verb, noun, etc
    const [types, setTypes] = useState([]) // contains all types
    const [typesSelected, setTypesSelected] = useState([]) // contains types the user selected to review


    // contains all words that the user could review
    const [wordsToReview, setWordsToReview] = useState([])// words that has been reviewed at least once in the past
    const [wordsNew, setWordsNew] = useState([])// words that have never been reviewed

    // words that pass the user's selected filters, will be spliced into WordsReviewing
    const [wordsToReviewFiltered, setWordsToReviewFiltered] = useState([])
    const [wordsNewFiltered, setWordsNewFiltered] = useState([])


    // array of how many words will become available for review each day
    //check: currently not used, could make a graph
    // eslint-disable-next-line
    const [nexts, setNexts] = useState([])


    /**
     * Initializes data
     * 
     * types, nexts, wordsToReview, wordsNew
     */
    useEffect(() => {

        let auxTypes = []
        let auxNexts = []
        let auxWordsToReview = []
        let auxWordsNew = []


        // process each word
        Globals.$words?.forEach(word => {

            // if there is a selected song, check if this word is in some of the selected song's structures
            if (selectedSong) {
                let found = false // flag

                for (let i = 0; i < selectedSong.lines.length; i++) {
                    const line = selectedSong.lines[i]
                    for (let j = 0; j < line.structures?.length; j++) {
                        for (let y = 0; y < line.structures[j].words.length; y++) {
                            if (word.word === line.structures[j].words[y].word)
                                found = true
                        }
                    }
                }

                // stop futher processing of the word if it was not found
                if (!found)
                    return
            }


            // get word stat
            const stat = Globals.$stats.score?.find(stat => stat.word === word.word)

            // word has been reviewed in the past
            if (stat) {

                // if the review date is due
                if (stat.next < new Date()) {
                    auxWordsToReview.push(word)
                    auxTypes.push(...Object.keys(word.meanings)) // gets the types of all meanings of the word
                    // some words can have multiple types, the type is stored as the Key and the meaning is the Value of the meanings property
                }

                // this word does not need to be reviewed yet
                else {

                    // gets the next for the date the word becomes available for review
                    const next = auxNexts.find(next => next.next === stat.next.toLocaleDateString().split('T')[0])

                    // if such date already has words to review, simply add 1
                    if (next) {
                        next.amount++
                    }

                    // this is the first word to be reviewed in this date, further words will be caught in the previous IF
                    else {
                        auxNexts.push({
                            next: stat.next.toLocaleDateString().split('T')[0],
                            amount: 1
                        })
                    }
                }
            }

            // word has no stat therefore has not been reviewed in the past
            else {
                auxWordsNew.push(word)
                auxTypes.push(...Object.keys(word.meanings))
            }
        })

        auxTypes.sort()
        setTypes([...new Set(auxTypes)]) // removes duplicates from array //consider: could i simply use a set from the start? or a List
        setTypesSelected([...new Set(auxTypes)]) // default selected types is set to all of them

        auxNexts.sort((a, b) => a.next - b.next)
        setNexts(auxNexts)
        console.log(auxNexts[0])

        setWordsNew(auxWordsNew)
        setWordsToReview(auxWordsToReview)

        //FIX:
        //consider: store filters on localStorage or config
        //check: sort arrays of words so splice always takes the oldest or most used ones
    }, [selectedSong])


    /**
     * Applies filters if types or selectedSong changes
     * 
     * sets wordsToReviewFiltered, and wordsNewFiltered
     */
    useEffect(() => {
        //check: if a word has 2 types, and it is the only one of a certain type, when you deselect this type nothing happens, as the word will still be available because of the other type, therefore the button does nothing, what should i do?


        // sets words that pass the filters
        setWordsToReviewFiltered(wordsToReview.filter(filterWords))
        setWordsNewFiltered(wordsNew.filter(filterWords))
        //consider: should i also filter this.nexts?


        function filterWords(word) {

            // first filter: type
            // filter out this word if it doesn't contain any of the types selected
            if (Object.keys(word.meanings).filter(type => typesSelected.includes(type)).length === 0)
                return false


            // second filter: song specific
            // if no song was selected, all words pass the filter
            if (!selectedSong)
                return true


            // there is a selected song, check if the song contains this word
            for (let i = 0; i < selectedSong.lines.length; i++) {
                for (let j = 0; j < selectedSong.lines[i].structures?.length; j++) {
                    for (let y = 0; y < selectedSong.lines[i].structures[j].words.length; y++) {
                        if (word.word === selectedSong.lines[i].structures[j].words[y].word)
                            return true
                    }
                }
            }
        }


        // had to add all these dependencies to avoid warnings, should i just disable the warning? is it ok to add all these?
    }, [types, typesSelected, selectedSong, wordsNew, wordsToReview])



    /**
     * Selects or deselects the type clicked, this triggers previous useEffect
     * 
     * @param {*} type type clicked
     */
    function selectType(type) {
        let auxTypesSelected

        // type is currently selected, so check if we should deselect it
        if (typesSelected.includes(type)) {

            // if this is the only type selected when clicking, we should not deselect it, but rather select all types again
            if (typesSelected.length === 1) {
                auxTypesSelected = types.slice(0)
            }

            // this is not the only type selected, so can safely remove it from array
            else
                auxTypesSelected = typesSelected.filter(type2 => type2 !== type)
        }

        // type was not selected, so we add it to array
        else
            auxTypesSelected = [...typesSelected, type]


        // sets State and triggers useEffect
        setTypesSelected(auxTypesSelected)
    }



    /**
     * Called by start buttons
     * sets state of parent component which will remove this component and replace with review-session
     * 
     * @param {*} newWords true if review new words, false if review already reviewed words
     */
    function startReview(newWords) {
        setWordsReviewing(newWords ? wordsNewFiltered.slice(0, reviewCountLimit) : wordsToReviewFiltered.slice(0, reviewCountLimit))
    }



    return <>
        {/* select with each song as option, used to review only this specific song's words, it's default value is set by location.state*/}
        <select defaultValue={location.state?.song.title ?? 'All songs'} onChange={e => {
            setSelectedSong(Globals.$songs.find(song => song.title === e.target.value)) // searches and sets the newly selected song
        }} >

            <option>All songs</option>
            {
                Globals.$songs.map((song, index) =>
                    <option key={index}>{song.title}</option>
                )
            }
        </select>


        <br /><br />


        {/* input with - and + buttons to increase/reduce reviewCountLimit by intervals of 10 */}
        <div className='review-count-buttons-container'>
            <button onClick={() => setReviewCountLimit(reviewCountLimit - 10)} disabled={reviewCountLimit === 10}>{'<'}</button>
            <input disabled={true} value={reviewCountLimit}></input>
            <button onClick={() => setReviewCountLimit(reviewCountLimit + 10)} disabled={reviewCountLimit === 100}>{'>'}</button>
        </div>



        <p>{wordsToReviewFiltered.length} words to review</p>
        <p>{wordsNewFiltered.length} new words</p>


        {/* types buttons, types can be selected/deselected by clicking them */}
        <div className='review-options-typebuttons'>
            {
                // selected and deselected types have different css classes
                types.map(type =>
                    <button className={typesSelected.includes(type) ? 'review-options-typebuttons-button' : 'review-options-typebuttons-button-deselected'}
                        key={type} onClick={() => { selectType(type) }}
                    >{type}</button>
                )
            }
        </div>


        <br /><br />


        {/* start buttons, disabled if no word passes the filters */}
        <div >
            <button className='review-options-startbutton' disabled={!wordsNewFiltered.length} onClick={() => startReview(true)}>Learn new words</button>

            <button className='review-options-startbutton float-right' disabled={!wordsToReviewFiltered.length} onClick={() => startReview(false)}>Review known words</button>
        </div>


        <br />

        {
            nexts.length &&
            <p>{nexts[0].amount} words will become available to review on the {nexts[0].next}</p>
        }
    </>
}