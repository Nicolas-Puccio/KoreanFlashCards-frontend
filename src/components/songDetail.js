import React from 'react';
import { Globals } from '../Global';

class SongDetail extends React.Component {

    details(structure) {
        //consider: give words without meaning an identifier like an dotted underline??? didn't i do this already?
        if (structure.words.length > 1 || structure.words[0].meaning || structure.words[0].word)
            this.setState({ structure });
    }



    className(structure) {
        //check: get the lowest score from all the words, currently just gets the first, will this ever be needed?
        const temp = structure.words.find(word => word.word);//check: is this line functional?
        return temp ? 'score' + Globals.$stats.score?.find(stat => stat.word === temp.word)?.score : 'text';
    }



    render() {
        return <>
            <h2 className='lyrics-h2'>{this.props.song.title}</h2>

            <div className='lyrics-container'>{

                this.props.song.lines.map((line, index) => {
                    if (!line.structures)
                        return <br key={index} />

                    return line.structures.map((structure, index2) => {
                        return [
                            index2 === 0 ? <br key={'space' + index + index2} /> : <span key={'space' + index + index2}> </span>,
                            <span key={index + index2} className={this.className(structure)} onClick={() => this.details(structure)}>{structure.written}</span>
                        ]
                    })
                })

            }</div>

            {
                this.state?.structure &&
                <div className='popup' onClick={() => { if (this.state.selectedWord) this.setState({ selectedWord: undefined }); else this.setState({ structure: undefined }) }}>
                    <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                        {
                            !this.state.selectedWord &&
                            <>
                                <h1 className='popup-inner-h1'>{this.state.structure.written}</h1>
                                <div className='popup-inner-details-container'>{
                                    this.state.structure.words.map((word, index) =>
                                        <div key={index} className='popup-inner-details'>
                                            <h2 className={Globals.$words.find(word2 => word2.word === word.word) ? 'popup-inner-details-clickable' : null} onClick={() => this.setState({ selectedWord: Globals.$words.find(word2 => word2.word === word.word) })}>{word.written}</h2>
                                            <p>{word.meaning.split('-')[0]}</p>
                                            <p>{word.meaning.slice(word.meaning.indexOf('-') + 1)/** //check: i should be using regex here */}</p>
                                        </div>
                                    )
                                }</div>
                            </>
                        }
                        {
                            this.state.selectedWord &&
                            <div className='popup-inner-details'>
                                <h1>{this.state.selectedWord.word}</h1>

                                <ul className='popup-inner-details-ul'>{
                                    Object.keys(this.state.selectedWord.meanings).map((key) =>
                                        <li className='popup-inner-details-ul' key={key}>{key}: {this.state.selectedWord.meanings[key]}</li>
                                    )
                                }</ul>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    }
}

export default SongDetail

