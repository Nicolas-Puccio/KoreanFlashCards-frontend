import React, { useEffect, useState } from 'react'

//fix: comment file
export default function AuthorizationPage({ data }) {
    console.log(data)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Submit = (signin) => {//true = signin, false = login
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

                    data.SetUser({
                        admin: cookie[0],
                        username: cookie[1]
                    })
                }
            })
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        const cookie = document.cookie.split('; ').filter(row => row.startsWith('token=')).map(c => c.split('=')[1])[0]
        console.log(cookie)
        if (cookie) {
            data.SetUser({
                admin: cookie.split('-')[0],
                username: cookie.split('-')[1]
            })
        }
        //check: is this correct?
        // eslint-disable-next-line
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

    )


}
