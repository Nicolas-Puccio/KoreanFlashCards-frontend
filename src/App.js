import './App.css';
import SongList from './components/songList';
import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";



function test() {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/signin', true);

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({ username: 'test' }));
}

const test2 = () => {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/login', true);
  request.onreadystatechange = (event) => {
    if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
      console.log(request.responseText);

  };

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({ username: 'test' }));
}

const test3 = () => {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/login', true);

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({ username: 'test2' }));
}

const test5 = () => {
  var request = new XMLHttpRequest();
  request.onreadystatechange = (event) => {
    if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
      console.log(JSON.parse(request.responseText));

  };
  request.open('POST', 'http://localhost:3001/api/song/review', true);

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
  request.send(JSON.stringify({
    word: "63483eb5cd72592e16b8c014",
    next: new Date(),
    score: 10
  }));
}


function App() {
  const [songs, setSongs] = useState([])

  const getSongs = () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (event) => {
      if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200) {
        setSongs(() => JSON.parse(request.responseText))
        console.log(JSON.parse(request.responseText));
      }
    };
    request.open('GET', 'http://localhost:3001/api/song/', true);

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1ZjkwNGVmMDE2ZGVjOGE3MTYwMTkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYxMDE0NjN9.55YtqF7GBtShk-MF6pY8DYVCMNypmXma_WEX6hK7QFA");
    request.send();

  }
  return <Routes>
    <Route path="/" element={
      <div className="App">
        <button onClick={test}>signin</button>
        <button onClick={test2}>login</button>
        <button onClick={test3}>bad login</button>
        <Link to="/song">Songs</Link>

        <button onClick={test5}>Review</button>
        <br></br>
        <br></br>

      </div>} />
    <Route path="/song" element={<SongList />} />

  </Routes>
}

export default App;
