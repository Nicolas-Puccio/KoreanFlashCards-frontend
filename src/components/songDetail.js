import React from 'react';
import Globals from '../Global';

class SongDetail extends React.Component {

    details(structure) {
        this.setState({ structure });
    }

    className(structure) {
        //should get the lowest score from all the words, currently just gets the first
        const temp = structure.words.find(word => word.word);
        return temp ? 'score' + Globals.$stats.find(stat => stat.word === temp.word)?.score : 'text';
    }

    render() {
        return <div>
            <h1>{this.props.song.title}</h1>

            <div className='lyrics-container'>
                {
                    this.props.song.structures.map((structure, index) => {
                        if (structure.written)
                            return [
                                <span key={index} className={this.className(structure)} onClick={() => this.details(structure)}>{structure.written}</span>,
                                <span key={'space' + index}> </span>
                            ]
                        else
                            return <br key={index} />
                    })
                }
            </div>

            {
                this.state?.structure &&
                <div className='popup' onClick={() => {
                    if (this.state.selectedWord) this.setState({ selectedWord: undefined })
                    else this.setState({ structure: undefined })
                }}>
                    {
                        !this.state.selectedWord &&
                        <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                            <h1>{this.state.structure.written}</h1>
                            <div className='details-container'>
                                {
                                    this.state.structure.words.map((word, index) =>
                                        <div key={index} className='details-column'>
                                            <h1 className={this.props.words.find(word2 => word2.word === word.word) ? 'details-column-clickable' : null} onClick={() => this.setState({ selectedWord: this.props.words.find(word2 => word2.word === word.word) })}>{word.written}</h1>
                                            <p>{word.meaning.split('-')[0]}</p>
                                            <p>{word.meaning.slice(word.meaning.indexOf('-') + 1)/** //fix i should be using regex here */}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                    {
                        this.state.selectedWord &&
                        <div className='popup-inner-word' onClick={(e) => e.stopPropagation()}>

                            <h1>{this.state.selectedWord.word}</h1>

                            <ul className='popup-inner-word-ul'>
                                {
                                    Object.keys(this.state.selectedWord.meanings).map((key) =>
                                        <li className='popup-inner-word-ul' key={key}>{key}: {this.state.selectedWord.meanings[key]}</li>
                                    )
                                }
                            </ul>
                        </div>
                    }
                </div>
            }
        </div>
    }
}

export default SongDetail

