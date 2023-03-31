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

import { fetchData } from './Global'

import { MemoryRouter } from 'react-router'
import React, { useState, useEffect } from 'react'

// removing Router import causes error even if not used
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


export default function App() {

  const [dataInitialized, setDataInitialized] = useState(false)
  const [user, setUser] = useState(undefined) // const userExample = { admin: false, username: 'test' } // admin property not used for now



  /**
   * Checks if the user has an active cookie
   */
  useEffect(() => {
    fetchData(setDataInitialized)

    const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0]

    if (cookie) {
      setUser({
        admin: cookie.split('-')[0],
        username: cookie.split('-')[1]
      })
    }
  }, [])



  if (!dataInitialized)
    return <h1>loading</h1> //fix: add proper loading screen

  return <MemoryRouter>
    <NavBar data={{ user, setUser }} />
    <div className='main-div'>
      <Routes>
        <Route path='/' element={<SongsPage />} />
        <Route path='/review' element={<ReviewPage data={{ user }} />} />

        <Route path='/stats' element={<StatsPage data={{ user }} />} />
        <Route path='/login' element={<AuthorizationPage data={{ setUser }} />} />
      </Routes>
    </div>
  </MemoryRouter>
}