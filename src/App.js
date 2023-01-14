import './App.css'
import TestPage from './components/testPage'
import ReviewPage from './pages/review-page'
import SongsPage from './pages/songs-page'
import NavBar from './components/navbar'
import Stats from './components/stats'
import Admin from './components/admin'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Globals from './Global'


export default function App() {


  const [dataInitialized, setDataInitialized] = useState(false)


  useEffect(() => {
    Globals.fetchData(setDataInitialized)
  }, [])


  if (dataInitialized)//consider: should i set main-div on each component instead?
    return <Routes>
      <Route path='/' element={
        <>
          <NavBar />
          <div className='main-div'>
            <SongsPage />
          </div>
        </>
      } />
      <Route path='/review' element={
        <>
          <NavBar />
          <div className='main-div'>
            <ReviewPage />
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
    return <h1>loading</h1>
}
