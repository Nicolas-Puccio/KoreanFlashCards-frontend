import React, { useState, useEffect } from 'react';
import { Globals } from '../Global';
import { Link } from 'react-router-dom';

export default function SongsDetails({ data }) {


    const [showStats, setShowStats] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)
    const [colorCoded, setColorCoded] = useState(true)
    const [structure, setStructure] = useState(undefined)
    const [selectedWord, setSelectedWord] = useState(undefined)

    useEffect(() => {

    }, [])


    function details(structure) {
        //consider: give words without meaning an identifier like an dotted underline??? didn't i do this already?
        if (structure.words.length > 1 || structure.words[0].meaning || structure.words[0].word)
            setStructure(structure)
    }

    function className(structure) {
        //check: get the lowest score from all the words, currently just gets the first, will this ever be needed?
        const temp = structure.words.find(word => word.word);//check: is this line functional?
        return temp ? 'score' + Globals.$stats.score?.find(stat => stat.word === temp.word)?.score : 'text';
    }


    return (<>
        <button style={{ float: 'right' }} onClick={() => setShowStats(!showStats)}>Stats</button>

        <input type="checkbox" checked={showTranslation} onChange={() => setShowTranslation(!showTranslation)}></input>
        <label>English Translation</label>
        <br />
        <input disabled={showTranslation} type="checkbox" checked={colorCoded} onChange={() => setColorCoded(!colorCoded)}></input>
        <label>Lyrics Coloring</label>

        {
            showStats &&
            <div>
                {
                    <p>test</p>
                }
            </div>
        }


        <h2 className='lyrics-h2'>{data.selectedSong.title}</h2>

        <div className='lyrics-container'>{
            data.selectedSong.lines.map((line, index) => {
                if (!line.structures)
                    return <br key={index} />

                if (showTranslation)
                    return <p key={index} className="translation">{line.translation}</p>

                else
                    return line.structures.map((structure, index2) => {
                        const elements = [<span key={index + index2} className={colorCoded ? className(structure) : 'scorenocoloring'} onClick={() => details(structure)}>{structure.written}</span>];
                        if (index !== 0)
                            elements.unshift(index2 === 0 ? <br key={'space' + index + index2} /> : <span key={'space' + index + index2}> </span>)
                        return elements
                    })
            })

        }</div>

        {
            structure &&
            <div className='popup' onClick={() => { if (selectedWord) setSelectedWord(undefined); else setStructure(undefined) }}>
                <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                    {
                        !selectedWord &&
                        <>
                            <h1 className='popup-inner-h1'>{structure.written}</h1>
                            <div className='popup-inner-details-container'>{
                                structure.words.map((word, index) =>
                                    <div key={index} className='popup-inner-details'>
                                        <h2 className={Globals.$words.find(word2 => word2.word === word.word) ? 'popup-inner-details-clickable' : null} onClick={() => setSelectedWord(Globals.$words.find(word2 => word2.word === word.word))}>{word.written}</h2>
                                        <p>{word.meaning.split('-')[0]}</p>
                                        <p>{word.meaning.slice(word.meaning.indexOf('-') + 1)/** //check: i should be using regex here */}</p>
                                    </div>
                                )
                            }</div>
                        </>
                    }
                    {
                        selectedWord &&
                        <div className='popup-inner-details'>
                            <h1>{selectedWord.word}</h1>

                            <ul className='popup-inner-details-ul'>{
                                Object.keys(selectedWord.meanings).map((key) =>
                                    <li className='popup-inner-details-ul' key={key}>{key}: {selectedWord.meanings[key]}</li>
                                )
                            }</ul>
                        </div>
                    }
                </div>
            </div>
        }
    </>)

}