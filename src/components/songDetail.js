import React from 'react';
import { Globals } from '../Global';

class SongDetail extends React.Component {

    details(structure) {
        //fix maybe i should give words without meaning an identifier like an dotted underline?
        if (structure.words.length === 1 && !structure.words[0].meaning && !structure.words[0].word)
            return
        this.setState({ structure });
    }

    className(structure) {
        //should get the lowest score from all the words, currently just gets the first
        const temp = structure.words.find(word => word.word);
        return temp ? 'score' + Globals.$stats.find(stat => stat.word === temp.word)?.score : 'text';
    }

    render() {
        return <>
            <h2 className='lyrics-h2'>{this.props.song.title}</h2>

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
                    <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                        {
                            !this.state.selectedWord &&
                            <>
                                <h1 className='popup-inner-h1'>{this.state.structure.written}</h1>
                                <div className='popup-inner-details-container'>
                                    {
                                        this.state.structure.words.map((word, index) =>
                                            <div key={index} className='popup-inner-details'>
                                                <h1 className={Globals.$words.find(word2 => word2.word === word.word) ? 'popup-inner-details-clickable' : null} onClick={() => this.setState({ selectedWord: Globals.$words.find(word2 => word2.word === word.word) })}>{word.written}</h1>
                                                <p>{word.meaning.split('-')[0]}</p>
                                                <p>{word.meaning.slice(word.meaning.indexOf('-') + 1)/** //fix i should be using regex here */}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        }
                        {
                            this.state.selectedWord &&
                            <div className='popup-inner-details'>
                                <h1>{this.state.selectedWord.word}</h1>

                                <ul className='popup-inner-details-ul'>
                                    {
                                        Object.keys(this.state.selectedWord.meanings).map((key) =>
                                            <li className='popup-inner-details-ul' key={key}>{key}: {this.state.selectedWord.meanings[key]}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    }
}

export default SongDetail

