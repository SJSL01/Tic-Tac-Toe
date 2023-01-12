import { useState } from "react"
import { Auth } from "../Context/AuthContext"
import { useNavigate } from 'react-router-dom';


export default function Signup() {

    const navigate = useNavigate()
    const useAuth = Auth();
    console.log(useAuth);

    const [userDetail, setUserDetails] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserDetails({ ...userDetail, [name]: value })
    }

    const handleSignup = (e) => {
        e.preventDefault()
        useAuth.Signup(userDetail)
    }

    return (

        <div className='signup-container'>
            <h1>signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type={"text"} id='username' name='username' onChange={(e) => { handleInput(e) }} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type={"password"} id='password' onChange={(e) => { handleInput(e) }} name='password' />
                </div>
                <button type="submit">signup</button>
            </form>
            <button onClick={() => { navigate("/") }}>LOGIN</button>
        </div>
    )
}
