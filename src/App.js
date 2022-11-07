import './App.css';
import SongList from './components/songList';
import Review from './components/review';
import NavBar from './components/navbar';
import TestPage from './components/testPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';



function App() {
  return <Routes>
    <Route path='/' element={
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
    <Route path='/test' element={
      <div>
        <NavBar />
        <TestPage />
      </div>
    } />
  </Routes>
}



export default App;
