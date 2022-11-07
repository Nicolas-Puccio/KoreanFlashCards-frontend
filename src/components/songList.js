import React from 'react';
import SongDetail from './songDetail';
import { Link } from 'react-router-dom';
import Globals from '../Global';

class SongList extends React.Component {

    componentDidMount() {
        //hook called twice, how to avoid double request?
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                Globals.$songs = JSON.parse(request.responseText);
                localStorage.setItem('songs', JSON.stringify(Globals.$songs))
                this.setState({ songs: Globals.$songs });
            }
        };
        request.open('GET', 'http://localhost:3001/api/song/', true);

        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
        request.send();


        const request2 = new XMLHttpRequest();
        request2.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                Globals.$words = JSON.parse(request2.responseText);
                localStorage.setItem('words', JSON.stringify(Globals.$words))
                this.setState({ words: Globals.$words });
            }
        };
        request2.open('GET', 'http://localhost:3001/api/song/word', true);

        request2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request2.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
        request2.send();
    }

    render() {
        if (!this.state || !this.state.words || !this.state.songs)//component not ready
            return <h1>list loading</h1>

        if (!this.state.song)//display list if no song was selected
        {
            return this.state.songs.map((song) => {
                song.known = song.review = song.new_ = song.total = 0;
                const wordsFound = []
                const date = new Date()

                song.structures.forEach(structure => {
                    structure.words?.forEach(word => {
                        if (!word.word || wordsFound.includes(word.word))//word has no ID on db or //already added
                            return;

                        wordsFound.push(word.word);
                        song.total++;
                        const stat = Globals.$stats.find(stat => stat.word === word.word)

                        if (!stat)
                            song.new_++;
                        else {
                            if (stat.score > 2)
                                song.known++;
                            if (new Date(stat.next) < date)
                                song.review++;
                        }
                    })
                })

                return <div key={song.title} className='songContainer'>
                    <div style={{ width: '100%' }}>
                        <Link to='/review' className='songContainer-link'>Review</Link>
                        <h1 className='songContainer-h1' onClick={() => { this.setState({ song: song }) }}>{song.title}</h1>

                    </div>
                    <p style={{ marginTop: '10px', marginBottom: '5px' }}>{song.total} words</p>
                    <div className='progress-bar'>
                        <div style={
                            { height: '100%', width: `${song.known / song.total * 100}%`, backgroundColor: 'green', borderRadius: '15px' }
                        } className='progress-bar-progress'></div>

                    </div>

                </div >
            })
        }

        //display song if selected
        console.log(this.state.song)
        return <SongDetail song={this.state.song} words={this.state.words} />
    }
}

export default SongList