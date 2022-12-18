import './App.css';
import SongList from './components/songList';
import TestPage from './components/testPage';
import Review from './components/review';
import NavBar from './components/navbar';
import Stats from './components/stats';
import Admin from './components/admin';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Globals from './Global';



class App extends React.Component {

  DataLoaded = () => {
    this.setState({ data: true })
  }

  render() {
    //consider: fix App rendering 4 times because of setState, should only be 3? or 2?
    Globals.fetchData(this);
    if (this.state?.data)
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
        <Route path='/stats' element={
          <>
            <NavBar />
            <div className='main-div'>
              <Stats />
            </div>
          </>
        } />
        <Route path='/admin' element={
          <>
            <NavBar />
            <div className='main-div'>
              <Admin />
            </div>
          </>
        } />
      </Routes>
    else //fix: add proper loading screen
      return <><h1>loading</h1></>
  }
}

export default App;
