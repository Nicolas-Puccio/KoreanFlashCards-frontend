import React from 'react';

class Song extends React.Component {

    constructor(props) {
        super(props);
        console.log(props._id)
    }

    componentDidMount() {
        //hook called twice, how to avoid double request?
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                this.setState({ song: JSON.parse(request.responseText).song })
                this.setState({ stats: JSON.parse(request.responseText).stats })
            }
        };
        request.open('GET', `http://localhost:3001/api/song/${this.props._id}`, true);

        console.log(this.props._id)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
        request.send();

    }

    render() {
        if (!this.state?.song)
            return <h1>details loading</h1>

        return <h1>{this.state.song.title}</h1>

    }
}

export default Song