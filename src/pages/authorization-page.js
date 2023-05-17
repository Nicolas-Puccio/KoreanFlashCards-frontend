import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import { Globals } from '../Global'

//fix: comment file
export default function AuthorizationPage({ data: { setUser } }) {

    // used to redirect after login
    const navigate = useNavigate()


    // login and register form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })


    // called after each key press
    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    /**
     * 
     * @param {boolean} signin true = signin, false = login
     */
    const Submit = async signin => {

        /* basic email check
        if (!formData.email.includes('@') || formData.email.startsWith('@') || formData.email.endsWith('@')) {
            alert('email not valid')
            return
        }
        */

        if (formData.username.includes('-')) { // includes backend check
            alert('username can not contain the character "-"')
            return
        }

        const data = await login(signin ? 'signin' : 'login', JSON.stringify(formData))
        if (data) {

            // cookie set by backend has format 'isAdmin-userName'
            const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0].split('-')

            
            Globals.$stats = data

            setUser({
                admin: cookie[0],
                username: cookie[1]
            })

            navigate('/')
        }

    }


    return <>
        <div className='form'>
            <form onSubmit={e => e.preventDefault()}>

                <div className='form-group'>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        value={formData.email}
                        placeholder='email'
                        onChange={onChange}
                        disabled
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='username'
                        value={formData.username}
                        placeholder='username'
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        name='password'
                        value={formData.password}
                        placeholder='password'
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <button className='form-submit' onClick={() => Submit(true)}>Sign In</button>
                    <button className='form-submit' onClick={() => Submit(false)}>Login</button>
                </div>
            </form>
        </div>
    </>



}
