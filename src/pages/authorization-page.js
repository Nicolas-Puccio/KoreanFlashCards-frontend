import React, { useEffect, useState } from 'react'


export default function AuthorizationPage({ data }) {
    console.log(data)
    const [formData, setFormData] = useState({
        email: '',//check: unused
        password: '',//check: unused
        username: ''
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Submit = (signin) => {//true = signin, false = login
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
                else data.SetUser(json.username)
            })
                .catch(err => console.error(err))
        })
    }

    useEffect(() => {
        const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0]
        console.log(cookie)
        if (cookie)
            data.SetUser(cookie)
    }, [])

    return (
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
                        disabled={true}
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
                        disabled={true}
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

    )


}
