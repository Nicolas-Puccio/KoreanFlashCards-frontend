import './App-mobile.css'
import './App.css'
import './style/navbar.css'
import './style/songs-page.css'
import './style/stats-page.css'
import NavBar from './components/navbar'
import ReviewPage from './pages/review-page'
import SongsPage from './pages/songs-page'
import StatsPage from './pages/stats-page'
import AuthorizationPage from './pages/authorization-page'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Globals, fetchData } from './Global'


export default function App() {

  const [dataInitialized, setDataInitialized] = useState(false)
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

    fetchData(setDataInitialized, cookie ? cookie.split('-')[1] : undefined)
  }, [])



  if (!dataInitialized)
    return <h1>loading</h1> //fix: add proper loading screen

  else if (Globals.$songs.length === 0 || Globals.$words.length === 0)
    return <h1>server is not responding and there is no localStorage</h1> //fix:


  return <Router>
    <NavBar data={{ user, setUser }} />
    <div className='main-div'>
      <Routes>
        <Route path='/' element={<SongsPage />} />
        <Route path='/review' element={<ReviewPage data={{ user }} />} />

        <Route path='/stats' element={<StatsPage data={{ user }} />} />
        <Route path='/login' element={<AuthorizationPage data={{ setUser }} />} />
      </Routes>
    </div>
  </Router>
}