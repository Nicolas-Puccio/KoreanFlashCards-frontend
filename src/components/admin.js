import React from 'react';

//fix: all the file
class Admin extends React.Component {

    testStats() {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
                console.log(JSON.parse(request.responseText));
            }
        };
        request.open('POST', 'http://localhost:3001/api/user/stats/', true);

        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setRequestHeader('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA');
        request.send();
    }

    render() {
        return <>
            <button onClick={() => this.testStats()}>stats</button>
        </>
    }
}

export default Admin;