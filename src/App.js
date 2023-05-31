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

import { getData, setToken } from './services/api'

import { setGlobals } from './Global'

import { MemoryRouter } from 'react-router'
import React, { useState, useEffect } from 'react'

// removing Router import causes error even if not used
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import jwt_decode from 'jwt-decode'


export default function App() {

  const [dataInitialized, setDataInitialized] = useState(false)
  const [user, setUser] = useState(undefined) // const userExample = {Dusername: 'test' } // admin property not used for now,
  //user object could also store the role of the user



  /**
   * Checks if the user has an active cookie
   * //-this code is now messy, how should i organize it?
   */
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      const decodedToken = token ? jwt_decode(token) : undefined

      if (decodedToken) {
        setToken(token)

        setUser({
          username: decodedToken.username
        })
      }

      const data = await getData(decodedToken.username)

      setGlobals(data)
      setDataInitialized(true)
    }

    fetchData()
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