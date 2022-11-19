import React from 'react';
import SongDetail from './songDetail';
//import { Link } from 'react-router-dom';
import { Globals } from '../Global';

class SongList extends React.Component {

    deselect() {
        if (this.state.song)
            this.setState({ song: undefined })
    }



    render() {
        if (!this.state?.song)//display list if no song was selected
        {
            return Globals.$songs.map((song) => {
                song.known = song.review = song.new_ = song.total = 0;
                const wordsFound = []
                const date = new Date()

                song.lines.forEach(line => {
                    line.structures?.forEach(structure => {
                        structure.words?.forEach(word => {
                            if (!word.word || wordsFound.includes(word.word))//word has no ID on db or //already added
                                return;

                            wordsFound.push(word.word);
                            song.total++;
                            const stat = Globals.$stats.find(stat => stat.word === word.word)

                            if (!stat)
                                song.new_++;
                            else {
                                if (stat.score > 4)
                                    song.known++;
                                if (new Date(stat.next) < date)
                                    song.review++;
                            }
                        })
                    })
                })

                return <div key={song.title} className='song-container'>
                    <div style={{ width: '100%' }}>
                        {
                            //<Link to='/review' className='song-container-review-button'>Review</Link>
                        }
                        <h2 className='song-container-h2' onClick={() => { this.setState({ song: song }); Globals.songList = this }}>{song.title}</h2>

                    </div>
                    <p className='song-container-p'>{song.known + ' / ' + song.total}</p>
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
        return <SongDetail song={this.state.song} />
    }
}

export default SongList