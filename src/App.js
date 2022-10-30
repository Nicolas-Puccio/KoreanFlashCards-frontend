import './App.css';
import SongList from './components/songList';
import Review from './components/review';
import React from 'react';
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

function App() {
  return <Routes>
    <Route path="/" element={
      <div className="App">
        <button onClick={test}>signin</button>
        <button onClick={test2}>login</button>
        <button onClick={test3}>bad login</button>
        <Link to="/song">Songs</Link>

        <Link to="/review">Review</Link>
        <br></br>
        <br></br>

      </div>} />
    <Route path="/song" element={<SongList />} />
    <Route path="/review" element={<Review />} />

  </Routes>
}

export default App;
