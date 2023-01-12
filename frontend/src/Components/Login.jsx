import { useState } from 'react'
import { Auth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {

    const navigate = useNavigate()

    const useAuth = Auth();

    useEffect(() => {
        useAuth.loggedIn ? navigate("/welcome") : navigate("/")
    }, [])

    const [userDetail, setUserDetails] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserDetails({ ...userDetail, [name]: value })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        useAuth.Login(userDetail)
    }
    return (
        <div className='login-container'>
            <h1>login</h1>
            <form>

                <div>
                    <label htmlFor="username">username</label>
                    <input type={"text"} id='username'
                        name='username' onChange={(e) => { handleInput(e) }} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type={"password"} id='password'
                        name='password' onChange={(e) => { handleInput(e) }} />
                </div>
                <button onClick={(e) => { handleLogin(e) }} type='submit'>Login</button>
            </form>

            <button onClick={() => { navigate("/signup") }}>SIGNUP</button>
        </div>
    )
}
