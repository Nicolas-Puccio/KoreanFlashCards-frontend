import './App-mobile.css'
import './App.css'
import './style/navbar.css'
import './style/songs-page.css'
import './style/stats-page.css'

import NavBar from './components/navbar'

import ReviewPage from './pages/review-page'
import SongsPage from './pages/songs-page'
import StatsPage from './pages/stats-page'


import { setGlobals } from './Global'

import { MemoryRouter } from 'react-router'
import React, { useState, useEffect } from 'react'

// removing Router import causes error even if not used
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



export default function App() {

  const [dataInitialized, setDataInitialized] = useState(false)


  /**
   * Checks if the user has an active cookie
   * //-this code is now messy, how should i organize it?
   */
  useEffect(() => {
    setGlobals()
    setDataInitialized(true)
  }, [])



  if (!dataInitialized)
    return <h1>loading</h1> //fix: add proper loading screen

  return <MemoryRouter>
    <NavBar />
    <div className='main-div'>
      <Routes>
        <Route path='/' element={<SongsPage />} />
        <Route path='/review' element={<ReviewPage />} />

        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </div>
  </MemoryRouter>
}