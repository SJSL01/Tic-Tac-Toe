import { useLocation, useNavigate } from "react-router-dom"
import "../Styles/Welcome.css"
import { Auth } from "../Context/AuthContext";
import { useEffect } from "react";
import { Channel } from "../Context/ChannelContext";
import Game from "./Game";

export default function () {

  const useAuth = Auth();
  const useChannel = Channel();

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    useAuth.getOnlineUsers()
    console.log(useChannel.channel);
    useAuth.loggedIn ? navigate(location.pathname) : navigate("/")
  }, [])


  return (
    <>
      {!useChannel.channel ? <div className='welcome-container'>
        <div className="left">
          <h1>Welcome</h1>
          Online Users
          <button onClick={useAuth.getOnlineUsers}>Refresh</button>
          {useAuth.onlineUsers.map(user => {
            return (
              <>
                <li onClick={(e) => { useChannel.setOpponent(e.target.innerHTML) }}>{user.name}</li>
              </>
            )
          })}
        </div>
        <div className="right">
          <input onChange={(e) => { useChannel.setOpponent(e.target.value) }}
            type="text" value={useChannel.opponent} name="roomId" id="Opponent's Name"
            placeholder="Opponent's Name" />
          <button onClick={useChannel.createChannel}>Start Game</button>
        </div>
      </div>
        :
        <>
          {navigate("/play")}
        </>}
    </>
  )
}
