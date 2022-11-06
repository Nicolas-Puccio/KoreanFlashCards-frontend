import React from 'react';
import Globals from '../Global';

class TestPage extends React.Component {
    render() {
        const words = [];
        Globals.$songs.forEach(song => {
            song.structures.forEach(structure => {
                structure.words?.forEach(word => {
                    if (word.word) {
                        if (!Globals.$words.find(word2 => word2.word === word.word) && !words.includes(word))
                            words.push(word)
                    }
                });
            })
        });
        console.log(words)

        return <div>
            <ul>
                {
                    words.map((word, index) => <li key={index} onClick={() => this.setState({ word })}>{word.word}</li>)
                }
            </ul>

            <input placeholder={this.state?.word.word} disabled></input>
            <button disabled={!this.state?.word} onClick={() => {

                const request = new XMLHttpRequest();
                request.onreadystatechange = (event) => {
                };
                request.open('POST', 'http://localhost:3001/api/song/writetest/', true);

                request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
                const payload = {
                    word: this.state.word.word,
                    meanings: {}
                }
                payload.meanings[this.type] = this.def
                request.send(JSON.stringify(payload));

            }
            }>submit</button>
            <br />
            <br />

            <input placeholder='type' onChange={e => this.type = e.target.value}></input>
            <input placeholder='def' onChange={e => this.def = e.target.value}></input>
        </div>
    }
}

export default TestPage;