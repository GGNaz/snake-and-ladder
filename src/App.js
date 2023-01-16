import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import Board from "./Components/Board";

function App() {
  const [loading, setLoading] = useState(true);
  const [landscapeCheck, setLandscapeCheck] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setInterval(() => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setLandscapeCheck(false)
        console.log("you're in PORTRAIT mode")
        // you're in PORTRAIT mode
     }
     
     if (window.matchMedia("(orientation: landscape)").matches) {
      // if(!window.location.hash) {
      setLandscapeCheck(true)
      // window.location = window.location + '#loaded';
      // window.location.reload();
      console.log("you're in LANDSCAPE mode")
       // you're in LANDSCAPE mode
    //  }
    }
    },1000)
    
  }, []);

  const renderTheGame = () => {
    return (
      <>
      {!loading ? (
        <Board />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <img
            src="https://i.pinimg.com/originals/93/81/35/9381353de0573689f5c1d2ad7a3a3a2d.gif"
            className="flex justify-center items-center h-screen"
            alt="logo"
          />
        </div>
      )}
      </>
    )
  }

  const renderInPortrait = () => {
    return (
      <div className="flex flex-col justify-center items-center">
      <Player
      src='https://assets8.lottiefiles.com/private_files/lf30_qo9qo8oq.json'
      className="player h-[60vh]"
      loop
      autoplay
    />
    <div className="font-semibold text-2xl">{`Please rotate your phone :)`}</div>
    </div>
    )
  }

  return (
    <div className="h-screen">
      {!landscapeCheck ? renderInPortrait() : renderTheGame()}
    </div>
  );
}

export default App;
