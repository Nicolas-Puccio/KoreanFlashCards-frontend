import './App-mobile.css'
import './App.css'
import TestPage from './components/testPage'
import ReviewPage from './pages/review-page'
import SongsPage from './pages/songs-page'
import NavBar from './components/navbar'
import StatsPage from './pages/stats-page'
import Admin from './pages/admin-page'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Globals from './Global'


export default function App() {

  const [dataInitialized, setDataInitialized] = useState(false) //check: if request fails and there is no localstorage, display error message
  const [user, setUser] = useState(undefined) // const userExample = { admin: false, username: 'test' }



  /**
   * Checks if the user has an active cookie
   */
  useEffect(() => {
    const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0]

    if (cookie) {
      setUser({
        admin: cookie.split('-')[0],
        username: cookie.split('-')[1]
      })
    }

    Globals.fetchData(setDataInitialized, cookie ? cookie.split('-')[1] : undefined) //check: if user is logged in, fetchData should also retrieve stats backup
  }, [])



  if (!dataInitialized)
    return <h1>loading</h1> //fix: add proper loading screen



  return <Router>
    <NavBar data={{ user, setUser }} />
    <div className='main-div'>
      <Routes>
        <Route path='/' element={<SongsPage />} />
        <Route path='/review' element={<ReviewPage />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </div>
  </Router>
}