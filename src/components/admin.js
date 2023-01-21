import React, { useState } from 'react'
import { Globals } from '../Global'

//fix: all file, should use form
export default function Admin() {

    const [song, setSong] = useState(Globals.$songs[0]._id)
    const [line, setLine] = useState(undefined)


    function splitLine(e) {
        const split = e.target.value.trim().split(' ')
        console.log(split)

        const line = {
            translation: '',
            structures: []
        }

        split.forEach(written => {
            line.structures.push({
                words: [{
                    written,
                    meaning: '',//Example: Noun-sea
                    word: ''
                }],
                written
            })
        })

        setLine(line)
        console.log(line)
    }

    function setStructureProperty(structure, property, value) {
        structure[property] = value
        setLine(Object.assign({}, line))
    }

    function setWordProperty(word, property, value) {
        word[property] = value
        setLine(Object.assign({}, line))
    }

    function addEmptyWordToStructure(structure) {
        structure.words.push({
            written: '',
            meaning: '',
            word: ''
        })


        if (structure.words.length === structure.written.length) {
            const split = structure.written.split('')
            for (let i = 0; i < structure.words.length; i++)
                structure.words[i].written = split[i]
        }

        setLine(Object.assign({}, line))
    }


    function testAddLine() {
        //check: use fetch
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                console.log(JSON.parse(request.responseText));
            }
        };
        request.open('POST', 'http://localhost:3001/api/song/linetest', true);

        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
        request.send(JSON.stringify({ songId: song, line }));
        console.log({ songId: song, line })
    }


    return <>
        <select onBlur={test => setSong(Globals.$songs.find(song => song.title === test.target.value)._id)}>
            {
                Globals.$songs.map((song, index) =>
                    <option key={index}>{song.title}</option>
                )
            }
        </select>
        <br /><br />
        <input placeholder='line' onBlur={splitLine} />
        <input placeholder='line translation' onBlur={e => setLine({ ...line, translation: e.target.value })} />

        {
            line &&

            line.structures.map((structure, index) => {
                return (
                    <div key={index}>
                        <input placeholder='structure written' value={structure.written}
                            onChange={e => setStructureProperty(structure, 'written', e.target.value)} />

                        <button onClick={() => addEmptyWordToStructure(structure)}>+ word</button>
                        <br />



                        {
                            structure.words.map((word, index2) => {
                                return (
                                    <div key={index + '-' + index2}>
                                        <input placeholder='written' value={word.written}
                                            onChange={e => setWordProperty(word, 'written', e.target.value)} />
                                        <input placeholder='meaning' value={word.meaning}
                                            onChange={e => setWordProperty(word, 'meaning', e.target.value)} />
                                        <input placeholder='word' value={word.word}
                                            onChange={e => setWordProperty(word, 'word', e.target.value)} />
                                    </div>
                                )
                            })
                        }
                        <br />
                    </div>
                )
            })
        }
        < button onClick={() => testAddLine()}>submit</button>
    </>
}