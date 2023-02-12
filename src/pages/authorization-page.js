import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    const Submit = (signin) => {
        // basic email check
        if (!formData.email.includes('@') || formData.email.startsWith('@') || formData.email.endsWith('@'))//fix: just testing
        {
            alert('email not valid')
            return
        }


        //fix: add loading popup
        fetch(`http://localhost:3001/api/user/${signin ? 'signin' : 'login'}`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        }).then(res => {
            res.json().then(json => {
                if (res.status === 400)
                    alert(json.message)
                else {
                    //cookie set by backend has format 'isAdmin-userName'
                    const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0].split('-')
                    //check: what if username has a '-'?

                    setUser({
                        admin: cookie[0],
                        username: cookie[1]
                    })
                    navigate('/')
                }
            })
        }).catch(err => console.error(err))
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
                    <button className='form-submit' onClick={() => Submit(true)}>Sign In</button>
                    <button className='form-submit' onClick={() => Submit(false)}>Login</button>
                </div>
            </form>
        </div>
    </>



}
