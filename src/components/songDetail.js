import React from 'react';

class SongDetail extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    details(structure) {
        console.log(structure)
        this.setState({ structure })
    }

    render() {
        return <div>
            <h1>{this.props.song.title}</h1>
            {
                this.props.song.structures.map((structure, index) => {
                    if (structure.written)
                        return [
                            <span key={index} onClick={() => this.details(structure)}>{structure.written}</span>,
                            <span key={'space' + index}> </span>
                        ]
                    else
                        return <br key={index} />
                })
            }
            {
                this.state?.structure &&
                <div className='popup' onClick={() => this.setState({ structure: undefined })}>
                    <div className='popup-inner' onClick={(e) => e.stopPropagation()}>
                        <h1>{this.state.structure.written}</h1>
                        <div className='details-container'>
                            {
                                this.state.structure.words.map((word, index) =>
                                    <div key={index} className='details-column'>
                                        <h2>{word.written}</h2>
                                        <p>{this.props.words.find(word2 => word2._id === word.word)?.type ?? ''}</p>
                                        <p>{word.meaning}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    }
}

export default SongDetail