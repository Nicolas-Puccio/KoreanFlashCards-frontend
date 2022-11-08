import './App.css';
import SongList from './components/songList';
import Review from './components/review';
import NavBar from './components/navbar';
import TestPage from './components/testPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Globals from './Global';


//fix make sure all routes can handle lack of Globals data
function App() {
  Globals.fetchData();

  return <Routes>
    <Route path='/' element={
      <>
        <NavBar />
        <div className='main-div'>
          <SongList />
        </div>
      </>
    } />
    <Route path='/review' element={
      <>
        <NavBar />
        <div className='main-div'>
          <Review />
        </div>
      </>
    } />
    <Route path='/test' element={
      <>
        <NavBar />
        <div className='main-div'>
          <TestPage />
        </div>
      </>
    } />
  </Routes>
}



export default App;
