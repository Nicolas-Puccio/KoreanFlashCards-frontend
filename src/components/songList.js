import React from 'react';
import SongDetail from './songDetail';
import { Link } from 'react-router-dom';
import Stats from '../Global';

class SongList extends React.Component {

    componentDidMount() {
        //hook called twice, how to avoid double request?
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
                this.setState({ songs: JSON.parse(request.responseText) })
        };
        request.open('GET', 'http://localhost:3001/api/song/', true);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
        request.send();


        const request2 = new XMLHttpRequest();
        request2.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
                this.setState({ words: JSON.parse(request2.responseText) })
        };
        request2.open('GET', 'http://localhost:3001/api/song/word', true);

        request2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request2.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
        request2.send();
    }

    render() {
        if (!this.state || !this.state.words || !this.state.songs)//component not ready
            return <h1>list loading</h1>

        if (!this.state.song)//display list if no song was selected
        {
            return this.state.songs.map((song) => {
                song.known = song.review = song.new_ = 0;
                const wordsFound = []

                song.structures.forEach(structure => {
                    structure.words?.forEach(word => {
                        if (!word.word || wordsFound.includes(word.word))//word has no ID on db or //already added
                            return;

                        wordsFound.push(word.word);

                        const stat = Stats.find(stat => stat.word.equals(word.word))//fix equals or === ?

                        if (!stat)
                            song.new_++;
                        if (stat?.score > 0)
                            song.known++;
                        if (stat?.next < new Date())
                            song.review++;
                    })
                })

                return <div key={song._id} className="songContainer">
                    <h1 onClick={() => { this.setState({ song: song }) }}>{song.title}</h1>
                    <p>known {song.known}... review {song.review}... total {song.total}... new {song.new_}</p>
                    <Link to="/review">Review</Link>
                </div>
            })
        }

        //display song if selected
        console.log(this.state.song)
        return <SongDetail song={this.state.song} />
    }
}

export default SongList