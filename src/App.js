import './App.css';
import SongList from './components/songList';
import Review from './components/review';
import NavBar from './components/navbar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Globals from './Global';

function test() {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/signin', true);

  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify({ username: 'test' }));
}

const test2 = () => {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/login', true);
  request.onreadystatechange = (event) => {
    if (event.currentTarget.readyState === 4 && event.currentTarget.status === 200)
      console.log(request.responseText);

  };

  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify({ username: 'test' }));
}

const test3 = () => {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3001/api/user/login', true);

  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify({ username: 'test2' }));
}

function App() {
  return <Routes>
    <Route path='/' element={
      <div className='test'>
        <NavBar />
        <button onClick={test}>signin</button>
        <button onClick={test2}>login</button>
        <button onClick={test3}>bad login</button>
      </div>} />
    <Route path='/song' element={
      <div>
        <NavBar />
        <SongList />
      </div>
    } />
    <Route path='/review' element={
      <div>
        <NavBar />
        <Review />
      </div>
    } />
  </Routes>
}

export default App;
