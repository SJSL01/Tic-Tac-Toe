import { useContext } from "react";
import { createContext } from "react";
import axios from "axios"
import Cookies from "universal-cookie"
import { StreamChat } from "stream-chat"
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


    const [loggedIn, setLoggedIn] = useState(false)

    const cookies = new Cookies();

    const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY)

    const token = cookies.get("token")


    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log("yes");
        isLoggedin()
    }, [])



    const isLoggedin = async () => {

        try {
            client.connectUser(
                {
                    id: cookies.get("userID"),
                    name: cookies.get("username"),
                    password: cookies.get("password")
                }, token
            ).then((user) => {
                console.log(user);
                navigate("/welcome")
                return setLoggedIn(true)
            }).catch((e) => {
                return setLoggedIn(false)
            })

        } catch (error) {
            setLoggedIn(false)
            navigate("/", { replace: true })
            console.log(error.message);
        }


        try {
            const res = await axios.get("http://localhost:3010/api/getActiveUsers")
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const Login = async (userDetail) => {
        console.log(userDetail, "login");
        try {
            const res = await axios.post("http://localhost:3010/api/login", userDetail)
            console.log(res.data);
            cookies.set("token", res.data.token)
            cookies.set("userID", res.data.user.id)
            cookies.set("username", res.data.user.name)
            setLoggedIn(true)
            navigate("/welcome", { replace: true })
        } catch (error) {
            console.log(error.response.data);
        }
    }
    const Signup = async (userDetail) => {
        console.log(userDetail, "signup");
        try {
            const res = await axios.post("http://localhost:3010/api/signup", userDetail)
            console.log(res);
            cookies.set("token", res.data.userDetails.token)
            cookies.set("userID", res.data.userDetails.userID)
            cookies.set("username", res.data.userDetails.username)
            cookies.set("password", res.data.userDetails.password)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{ Signup, Login, loggedIn, setLoggedIn, cookies }}>
            {children}
        </AuthContext.Provider>
    )
}

export const Auth = () => {
    return useContext(AuthContext)
}

export default AuthContext;