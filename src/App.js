import './App.css'
import './App-mobile.css'
import TestPage from './components/testPage'
import ReviewPage from './pages/review-page'
import SongsPage from './pages/songs-page'
import NavBar from './components/navbar'
import StatsPage from './pages/stats-page'
import AuthorizationPage from './pages/authorization-page'
import Admin from './components/admin'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Globals from './Global'


export default function App() {


  const [dataInitialized, setDataInitialized] = useState(false)
  const [user, setUser] = useState(undefined)//stores username


  function SetUser(user) {//i need to set user and also request data
    console.log(user)
    setUser(user)
    Globals.fetchData(setDataInitialized)
  }

  if (!user)
    return <AuthorizationPage data={{ SetUser }} />


  if (!dataInitialized)
    return <h1>loading</h1>//fix: add proper loading screen


  return <Router>
    <NavBar data={{ user, setUser }} />{/**sends SetUser to use in logout button */}
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
