import React from 'react';
import SongDetail from './songdetail';

class SongList extends React.Component {

    constructor(props) {
        super(props);
    }

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

    }

    selectSong(_id){
        this.setState({_id})
    }

    render() {
        if (!this.state)//component not ready
            return <h1>list loading</h1>

        if (!this.state._id)//display list if no song was selected
            return this.state.songs.map((song) => (
                <div key={song._id} className="songContainer">
                    <p onClick={()=>{this.selectSong(song._id)}}>{song.title}</p>
                    <p>known {song.known}... review {song.review}... total {song.total}... new {song.new_}</p>
                </div>
            ))

        //display song if selected
        return <SongDetail _id={this.state._id} />
    }
}

export default SongList