import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Game.css"
import { useRef } from "react";
import { Channel } from "../Context/ChannelContext";


export default function Game() {

  const useChannel = Channel()

  const navigate = useNavigate()

  const [playWaiting, setPlayerWaiting] = useState(useChannel.channel?.state?.watcher_count === 2)

  useEffect(() => {
    console.log(useChannel.channel);
    if (!useChannel.channel) {
      navigate("/welcome", { replace: true })
    }
  }, [])

  useChannel.channel?.on("user.watching.start", e => {
    setPlayerWaiting(e.watcher_count === 2)
  })

  const [player, Setplayer] = useState(null)

  const [ctr, setCtr] = useState(0)

  const [tiles, setTiles] = useState(["", "", "", "", "", "", "", "", ""])


  const handleClick = (index) => {
    if (tiles[index] === "X" || tiles[index] === "O") {
      console.log("yes");
      return
    }
    const temp = tiles.map((elem, i) => {
      if (i === index) {
        setCtr(ctr + 1)
        return player;
      } else {

        return elem;
      }
    });
    setTiles(temp);

  }


  if (ctr > 4) {
    let flag = false;
    if ((tiles[0] === "X" && tiles[4] === "X" && tiles[8] === "X")
      || (tiles[2] === "X" && tiles[4] === "X" && tiles[6] === "X")
      || (tiles[0] === "X" && tiles[1] === "X" && tiles[2] === "X")
      || (tiles[3] === "X" && tiles[4] === "X" && tiles[5] === "X")
      || (tiles[6] === "X" && tiles[7] === "X" && tiles[8] === "X")
      || (tiles[0] === "X" && tiles[3] === "X" && tiles[6] === "X")
      || (tiles[1] === "X" && tiles[4] === "X" && tiles[7] === "X")
      || (tiles[2] === "X" && tiles[5] === "X" && tiles[8] === "X")) {
      setTimeout(() => {
        alert("X wins");
        setTiles(["", "", "", "", "", "", "", "", ""])
        setCtr(0)
        flag = true
      }, 0)
    }
    if ((tiles[0] === "O" && tiles[4] === "O" && tiles[8] === "O")
      || (tiles[2] === "O" && tiles[4] === "O" && tiles[6] === "O")
      || (tiles[0] === "O" && tiles[1] === "O" && tiles[2] === "O")
      || (tiles[3] === "O" && tiles[4] === "O" && tiles[5] === "O")
      || (tiles[6] === "O" && tiles[7] === "O" && tiles[8] === "O")
      || (tiles[0] === "O" && tiles[3] === "O" && tiles[6] === "O")
      || (tiles[1] === "O" && tiles[4] === "O" && tiles[7] === "O")
      || (tiles[2] === "O" && tiles[5] === "O" && tiles[8] === "O")) {
      setTimeout(() => {
        alert("O wins");
        setTiles(["", "", "", "", "", "", "", "", ""])
        setCtr(0)
        flag = true
      }, 0)
    }
    if (ctr === 9 && flag === false) {
      setTimeout(() => {
        alert("draw")
        setTiles(["", "", "", "", "", "", "", "", ""])
        setCtr(0)
      }, 0)
    }
  }


  return (
    <>
      {playWaiting ? <div className="main-container">

        <div onClick={() => {
          Setplayer("X")
        }} className="player1">
          player 1
          <span>X</span>
        </div>
        {player && <div className="game-container">

          <div className="top">

            <div className="box" onClick={() => { handleClick(0) }}>
              {tiles[0] !== "" && <img src={tiles[0] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(1) }}>
              {tiles[1] !== "" && <img src={tiles[1] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(2) }}>
              {tiles[2] !== "" && <img src={tiles[2] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>

          </div>


          <div className="middle">

            <div className="box" onClick={() => { handleClick(3) }}>
              {tiles[3] !== "" && <img src={tiles[3] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(4) }}>
              {tiles[4] !== "" && <img src={tiles[4] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(5) }}>
              {tiles[5] !== "" && <img src={tiles[5] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>

          </div>


          <div className="bottom">

            <div className="box" onClick={() => { handleClick(6) }}>
              {tiles[6] !== "" && <img src={tiles[6] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(7) }}>
              {tiles[7] !== "" && <img src={tiles[7] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>
            <div className="box" onClick={() => { handleClick(8) }}>
              {tiles[8] !== "" && <img src={tiles[8] === "X" ? "./cross.png" : "./circle.png"} alt="" />}
            </div>

          </div>
        </div>}
        <div onClick={() => {
          Setplayer("O")
        }} className="player2">
          player 2
          <span>O</span>
        </div>
      </div >
        :
        <>
          <h1>WAITING</h1>
        </>}    </>
  )
}
