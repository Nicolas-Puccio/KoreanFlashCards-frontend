import React from 'react';

class SongDetail extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.song)
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
                <div className='popup'>
                    <div className='popup-inner'>
                        <p>testing the p element</p>
                        <p>testing the p element</p>


                        <button>close</button>
                    </div>
                </div>
            }
        </div>
    }
}

export default SongDetail