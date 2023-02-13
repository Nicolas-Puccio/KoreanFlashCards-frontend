import React, { useState } from 'react'
import { Globals } from '../Global'

export default function SongsDetails({ data: { selectedSong } }) {

    const [showTranslation, setShowTranslation] = useState(false)
    const [colorCoded, setColorCoded] = useState(true)
    const [structure, setStructure] = useState(undefined)
    const [selectedWord, setSelectedWord] = useState(undefined)



    /**
     * 
     * @returns className of each structure based on the score
     */
    function className(structure) {
        //check: get the lowest score from all the words, currently just gets the first, will this ever be needed?
        const temp = structure.words.find(word => word.word)
        return temp ? 'score' + Globals.$stats.score?.find(stat => stat.word === temp.word)?.score : ''
    }



    return <>
        <input type="checkbox" checked={showTranslation} onChange={() => setShowTranslation(!showTranslation)}></input>
        <label>English Translation</label>

        <br />

        <input type="checkbox" checked={colorCoded} disabled={showTranslation} onChange={() => setColorCoded(!colorCoded)}></input>
        <label>Lyrics Coloring</label>


        <h2 className='lyrics-h2'>{selectedSong.title}</h2>



        <div className='lyrics-container'>{

            // song lyrics
            selectedSong.lines.map((line, index) => {

                // empty line in db represents a line break
                if (!line.structures)
                    return <br key={index} />

                // displays non-interactive english translation
                if (showTranslation)
                    return <p key={index} className="translation">{line.translation}</p>

                else
                    return line.structures.map((structure, index2) =>
                        // returns either a BR or a SPAN with a space, and the structure span 
                        [
                            index2 === 0 && index !== 0 ? <br key={'space' + index + index2} /> : <span key={'space' + index + index2}> </span>,
                            <span key={index + index2} className={colorCoded ? className(structure) : 'scorenocoloring'} onClick={() => setStructure(structure)}>{structure.written}</span>
                        ]
                    )
            })
        }</div>



        {
            // structure details popup
            structure &&

            // closes popup if clicking on background
            <div className='popup' onClick={() => { if (selectedWord) setSelectedWord(undefined); else setStructure(undefined) }}>

                <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                    {
                        !selectedWord &&

                        <>
                            <h1 className='popup-inner-h1'>{structure.written}</h1>

                            <div className='popup-inner-details-container'>{

                                // displays each structure's word
                                structure.words.map((word, index) =>
                                    <div key={index} className='popup-inner-details'>

                                        {/* if the words is in db it will have clickable style*/}
                                        <h2 className={Globals.$words.find(word2 => word2.word === word.word) ? 'popup-inner-details-clickable' : null}
                                            onClick={() => setSelectedWord(Globals.$words.find(word2 => word2.word === word.word))}>{word.written}</h2>


                                        <p>{word.meaning.split('-').length > 1 ? word.meaning.split('-')[0] : '???'}</p>
                                        <p>{word.meaning.slice(word.meaning.indexOf('-') + 1)}</p>
                                    </div>
                                )
                            }</div>
                        </>
                    }
                    {
                        // word details popup
                        selectedWord &&

                        <div className='popup-inner-details'>
                            <h1>{selectedWord.word}</h1>

                            <ul>{
                                Object.keys(selectedWord.meanings).map(key =>
                                    <li key={key}>{key}: {selectedWord.meanings[key]}</li>
                                )
                            }</ul>
                        </div>
                    }
                </div>
            </div>
        }
    </>
}