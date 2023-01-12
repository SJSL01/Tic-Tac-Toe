import { useLocation, useNavigate } from "react-router-dom"
import "../Styles/Welcome.css"
import uuid from 'react-uuid';
import { Auth } from "../Context/AuthContext";
import { useEffect } from "react";

export default function () {

  const useAuth = Auth();

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(useAuth.loggedIn);
    useAuth.loggedIn ? navigate(location.pathname) : navigate("/")
  }, [])

  return (
    <div className='welcome-container'>
      <div className="left">
        <h1>Welcome</h1>
        <button onClick={() => { navigate("/play") }}>Play with PC</button>
      </div>
      <div className="right">
        <button onClick={() => { navigate("/play", { state: { roomId: uuid() } }) }}>Play with Friend</button>
        <input onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/play", { state: { roomId: e.target.value } })
          }
        }}
          type="text" name="roomId" id="roomId" placeholder="room Id" />
      </div>
    </div>
  )
}
