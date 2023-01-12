import "../Styles/Navbar.css"
import { Auth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const useAuth = Auth();

    const navigate = useNavigate()

    const handleLogout = () => {
        useAuth.cookies.remove("token")
        useAuth.cookies.remove("username")
        useAuth.cookies.remove("userID")
        useAuth.cookies.remove("password")
        useAuth.client.disconnectUser()
        useAuth.setLoggedIn(false)
        navigate("/", { replace: true })
    }

    return (

        <nav>
            <ul className="nav-logo">
                <li>Tic Tac Toe</li>
            </ul>
            {!useAuth.loggedIn ?
                <ul className="nav-links">
                    <li>Login</li>
                    <li>SignUp</li>
                </ul> :
                <ul>
                    <button onClick={handleLogout}>LOGOUT</button>
                </ ul >
            }
        </nav>

    )
}
