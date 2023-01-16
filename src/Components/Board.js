import React, { useEffect, useState } from "react";
import snake from "../Assets/snake.png";
import ladder from "../Assets/ladder.png";
import board from "../Assets/board.JPG";
import { motion } from "framer-motion";
import { Player } from '@lottiefiles/react-lottie-player';
function Board() {

  let layers = [];
  let tempStore = [];
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [diceNumber, setDiceNumber] = useState(null);
  const [diceRolling, setDiceRolling] = useState(false);
  const [showSnakeModal, setShowSnakeModal] = useState(false);
  const [showLadderModal, setShowLadderModal] = useState(false);
  const [copyCurrentPosition, setCopyCurrentPosition] = useState(1);
  const [copyConsequencePostition, setCopyConsequencePosition] = useState(1);
  const [playerWinnerDetails, setPlayerWinnnerDetails] = useState(null);
  // let playerTurn = 1
  const max = 6;
  const min = 1;

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  let consequence = [
    {
      position: 2,
      isLadder: true,
      isSnake: false,
      makePosition: 38,
    },
    {
      position: 7,
      isLadder: true,
      isSnake: false,
      makePosition: 14,
    },
    {
      position: 8,
      isLadder: true,
      isSnake: false,
      makePosition: 31,
    },
    {
      position: 15,
      isLadder: true,
      isSnake: false,
      makePosition: 26,
    },
    {
      position: 16,
      isLadder: false,
      isSnake: true,
      makePosition: 6,
    },
    {
      position: 21,
      isLadder: true,
      isSnake: false,
      makePosition: 42,
    },
    {
      position: 28,
      isLadder: true,
      isSnake: false,
      makePosition: 84,
    },
    {
      position: 36,
      isLadder: true,
      isSnake: false,
      makePosition: 44,
    },
    {
      position: 46,
      isLadder: false,
      isSnake: true,
      makePosition: 25,
    },
    {
      position: 49,
      isLadder: false,
      isSnake: true,
      makePosition: 11,
    },
    {
      position: 51,
      isLadder: true,
      isSnake: false,
      makePosition: 67,
    },
    {
      position: 62,
      isLadder: false,
      isSnake: true,
      makePosition: 19,
    },
    {
      position: 64,
      isLadder: false,
      isSnake: true,
      makePosition: 60,
    },
    {
      position: 74,
      isLadder: false,
      isSnake: true,
      makePosition: 53,
    },
    {
      position: 78,
      isLadder: true,
      isSnake: false,
      makePosition: 98,
    },
    {
      position: 89,
      isLadder: false,
      isSnake: true,
      makePosition: 68,
    },
    {
      position: 71,
      isLadder: true,
      isSnake: false,
      makePosition: 91,
    },
    {
      position: 92,
      isLadder: false,
      isSnake: true,
      makePosition: 88,
    },
    {
      position: 87,
      isLadder: true,
      isSnake: false,
      makePosition: 94,
    },
    {
      position: 95,
      isLadder: false,
      isSnake: true,
      makePosition: 75,
    },
    {
      position: 99,
      isLadder: false,
      isSnake: true,
      makePosition: 80,
    },
  ];

  function getCurrentPlayerPosition(
    playerTurn,
    copyPlayer1Postion,
    copyPlayer2Postion,
    diceVal
  ) {
    // playerTurn === 1 ? copyPlayer1Postion + diceVal.toFixed(0) * 1  : copyPlayer2Postion + diceVal.toFixed(0) * 1
    if (playerTurn === 1) {
      return copyPlayer1Postion + diceVal.toFixed(0) * 1;
    } else {
      return copyPlayer2Postion + diceVal.toFixed(0) * 1;
    }
  }

  function checkIfPlayerWin(){
    if(player1>=100){
      return setPlayerWinnnerDetails(1)
    }else if(player2>=100){
      return setPlayerWinnnerDetails(2)
    }
  }

  useEffect(() => {
    checkIfPlayerWin();
  },[player1,player2])

  function rollTheDice(playerTurn) {
    let copyPlayer1Postion = player1;
    let copyPlayer2Postion = player2;
    setDiceRolling(true);
    const diceVal = Math.random() * max;
    setTimeout(() => {
      if (diceVal.toFixed(0) * 1 === 0) {
        setDiceNumber(1);
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
        getCurrentPlayerPosition(
          playerTurn,
          copyPlayer1Postion,
          copyPlayer2Postion,
          1
        );
        let checkConsequence = consequence.findIndex(
          (data) =>
            data.position ===
            getCurrentPlayerPosition(
              playerTurn,
              copyPlayer1Postion,
              copyPlayer2Postion,
              1
            )
        );
        console.log("checkConsequence", checkConsequence);
        if (checkConsequence >= 0) {
          consequence[checkConsequence].isLadder
            ? setShowLadderModal(true)
            : setShowSnakeModal(true);
          setCopyConsequencePosition(
            consequence[checkConsequence].makePosition
          );
          if (playerTurn === 1) {
            setPlayer1(consequence[checkConsequence].makePosition);
            setCopyCurrentPosition(
              copyPlayer1Postion === 1
                ? copyPlayer1Postion
                : copyPlayer1Postion + 1
            );
          } else {
            setPlayer2(consequence[checkConsequence].makePosition);
            setCopyCurrentPosition(
              copyPlayer2Postion === 1
                ? copyPlayer2Postion
                : copyPlayer2Postion + 1
            );
          }
        } else {
          playerTurn === 1
            ? setPlayer1(copyPlayer1Postion + 1)
            : setPlayer2(copyPlayer2Postion + 1);
        }
   
      } else {
        setDiceNumber(diceVal.toFixed(0) * 1);
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
        let checkConsequence = consequence.findIndex(
          (data) =>
            data.position ===
            getCurrentPlayerPosition(
              playerTurn,
              copyPlayer1Postion,
              copyPlayer2Postion,
              diceVal.toFixed(0) * 1
            )
        );
        console.log("checkConsequence", checkConsequence);
        if (checkConsequence >= 0) {
          consequence[checkConsequence].isLadder
            ? setShowLadderModal(true)
            : setShowSnakeModal(true);
          setCopyConsequencePosition(
            consequence[checkConsequence].makePosition
          );
          // setCopyCurrentPosition(copyPlayer1Postion);
          if (playerTurn === 1) {
            setPlayer1(consequence[checkConsequence].makePosition);
            setCopyCurrentPosition(
              copyPlayer1Postion === 1
                ? copyPlayer1Postion
                : copyPlayer1Postion + diceVal.toFixed(0) * 1
            );
          } else {
            setPlayer2(consequence[checkConsequence].makePosition);
            setCopyCurrentPosition(
              copyPlayer2Postion === 1
                ? copyPlayer2Postion
                : copyPlayer2Postion + diceVal.toFixed(0) * 1
            );
          }
        } else {
          playerTurn === 1
            ? setPlayer1(copyPlayer1Postion + diceVal.toFixed(0) * 1)
            : setPlayer2(copyPlayer2Postion + diceVal.toFixed(0) * 1);
        }
        // checkIfPlayerWin();
      }
      setDiceRolling(false);

      console.log("diceVal", diceVal.toFixed(0) * 1);
    }, 2000);
  }

  function Playerturn() {
    setShowLadderModal(false);
    setShowSnakeModal(false);
    if (playerTurn === 1) {
      return rollTheDice(1);
    } else {
      return rollTheDice(2);
    }
  }
  console.log("playerTurn", playerTurn);

  let setFirstNumber = [
    {
      startNum: 100,
      endNum: 91,
    },
    {
      startNum: 81,
      endNum: 90,
    },
    {
      startNum: 80,
      endNum: 71,
    },
    {
      startNum: 61,
      endNum: 70,
    },
    {
      startNum: 60,
      endNum: 51,
    },
    {
      startNum: 41,
      endNum: 50,
    },
    {
      startNum: 40,
      endNum: 31,
    },
    {
      startNum: 21,
      endNum: 30,
    },
    {
      startNum: 20,
      endNum: 11,
    },
    {
      startNum: 1,
      endNum: 10,
    },
  ];

  let ctr = 0;
  console.log("setFirstNumber", setFirstNumber);

  setFirstNumber?.map(async (data, index) => {
    console.log("index", index);
    let indexVal = index + 1;
    if (indexVal % 2 == 0) {
      console.log("even");
      for (ctr = data.startNum; ctr <= data.endNum; ctr++) {
        tempStore.push(ctr);
        if (ctr === data.endNum) {
          layers.push(tempStore);
          tempStore = [];
        }
      }
    } else {
      console.log("odd");
      for (ctr = data.startNum; ctr >= data.endNum; ctr--) {
        tempStore.push(ctr);
        if (ctr === data.endNum) {
          layers.push(tempStore);
          tempStore = [];
        }
      }
    }
  });
  console.log("tempStore", tempStore);
  console.log("layer1", layers);

  const showBoardFormat = () => {
    return (
      <div className="grid grid-cols-10 z-20 absolute top-0 min-w-full min-h-full">
        {layers.map((data) => {
          {
            return data.map((item, index) => {
              return (
                <div
                  className="text-black flex flex-col justify-center items-center "
                  key={index}
                >
                  <div className="flex flex-row">
                    {player1 === item && (
                      <div className="p-2 rounded-full bg-red-500 absolute shadow-2xl z-10"></div>
                    )}
                    {player2 === item && (
                      <div className="p-2 rounded-full bg-blue-500 absolute shadow-2xl z-20 -ml-3"></div>
                    )}
                  </div>
                </div>
              );
            });
          }
        })}
      </div>
    );
  };

  const eatBySnake = (
    <motion.div
    onClick={(e) => e.stopPropagation()}  
    className="modal orange-gradient absolute w-full h-full z-50"
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="bg-black/20 absolute w-full h-full z-50 shadow-xl flex flex-row justify-center items-center">
      <div className="p-2 bg-white flex flex-col rounded-xl w-[70%]">
      <div className="flex justify-center items-center">
        <img
        src={snake}
          alt="gifsnake"
          className="h-[50%] w-[50%]"
        />
      </div>
          {/* <Player
                src='https://www.clipartmax.com/png/middle/19-197925_snake-clipart-vector-png-parts-of-a-snake.png'
                className="player"
                loop
                autoplay
              /> */}
         <div className="flex flex-col justify-center items-center">
          <div>You've been eaten by a snake!</div>
          <div>
            Position: {copyCurrentPosition} {`->`} {copyConsequencePostition}{" "}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-700 text-white w-full py-2 rounded-full"
            onClick={() => setShowSnakeModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </motion.div>
  );


  const useLadder = (
    <motion.div
    onClick={(e) => e.stopPropagation()}  
    className="modal orange-gradient absolute w-full h-full z-50"
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="bg-black/20 absolute w-full h-full z-50 shadow-xl flex flex-row justify-center items-center">
      <div className="p-2 bg-white flex flex-col rounded-xl w-[70%]">
        <div className="flex justify-center items-center">
        <img
        src={ladder}
          // src="https://cdn-icons-png.flaticon.com/512/4212/4212592.png"
          alt="gifladder"
          className="h-[50%] w-[50%] "
        />
        </div>
       
         {/* <Player
                src='https://assets7.lottiefiles.com/packages/lf20_pcn1ppfb.json'
                className="player"
                loop
                autoplay
              /> */}
        <div className="flex flex-col justify-center items-center">
        <div>You found a Ladder!</div>
        <div>
          Position: {copyCurrentPosition} {`->`} {copyConsequencePostition}{" "}
        </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-700 text-white w-full py-2 rounded-full"
            onClick={() => setShowLadderModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </motion.div>
  );

  const resetTheGame = () => {
    setPlayerWinnnerDetails(null)
    setPlayer1(0)
    setPlayer2(0)
    setPlayerTurn(1)
    setDiceNumber(null)
  }

  const winnerPopupModal = (
    <motion.div
    onClick={(e) => e.stopPropagation()}  
    className="modal orange-gradient absolute w-full h-full z-50"
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="bg-black/20 absolute w-full h-full z-50 shadow-xl flex flex-row justify-center items-center">
      <div className="p-2 bg-white flex flex-col rounded-md w-[70%]">
        {/* <img
          src="https://media.tenor.com/TlFCLiZ9FIEAAAAM/otis-climb.gif"
          // src="https://cdn-icons-png.flaticon.com/512/4212/4212592.png"
          alt="gifladder"
          className="h-[70%]"
        /> */}
         <Player
                src='https://assets7.lottiefiles.com/packages/lf20_xldzoar8.json'
                className="player"
                loop
                autoplay
              />
        <div className="flex justify-center items-center text-lg">{`Player ${playerWinnerDetails} Win!`}</div>
       
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-green-700 text-white w-full py-2 rounded-full"
            onClick={() => resetTheGame()}
          >
            Play again
          </button>
         
        </div>
      </div>
    </div>
    </motion.div>
  );

  return (
    <div>
      {/* <div><span className="px-5 bg-red-500 w-[10.5rem]">Player 1 :</span></div>
       <div><span className="px-5  bg-blue-500 w-40">Player 2 :</span></div> */}

      <div className="flex flex-row gap-2">
        <div className="sm:basis-6/6 md:basis-4/6 border relative min-h-max">
          {showSnakeModal && eatBySnake}
          {showLadderModal && useLadder}
          {playerWinnerDetails&&winnerPopupModal}
          <img src={board} alt="board" className="z-10 min-w-full min-h-full" />
          {showBoardFormat()}
        </div>
        <div className="sm:basis-6/6 md:basis-2/6 border p-2 rounded-md bg-[#FCF4AB] min-h-max w-full ">
          <div className="flex flex-col gap-2 min-h-full relative">
            <div className="flex justify-center">
              <img
                src="https://www.gamexso.com/wp-content/uploads/2022/06/ecf012d2f6594cee1ff79eb930a31e3b.png"
                alt="logo"
              />
            </div>
            <div className="text-2xl flex flex-row justify-center gap-2  p-2">
              <div>Player</div>{" "}
              <div
                className={`rounded-full w-5 text-white flex justify-center items-center bg-${
                  playerTurn === 1 ? "red" : "blue"
                }-500 shadow-2xl`}
              >
                {playerTurn}
              </div>{" "}
              <div>turn!</div>
            </div>
            {/* <div> */}
            <div className="flex text-5xl w-full justify-center -mt-7 h-[50vh] items-center">
              {diceRolling ? (
                // <img
                //   // src="https://web2.ph.utexas.edu/~coker2/index.files/04dice.gif"
                //   src="https://assets9.lottiefiles.com/packages/lf20_979bgwwu.json"
                //   alt="diceGIF"
                // />
               
                <Player
                  src='https://assets9.lottiefiles.com/packages/lf20_979bgwwu.json'
                  className="player h-[40vh]"
                  loop
                  autoplay
                />
              ) : (
                diceNumber ?? ""
              )}
            </div>
            {/* </div> */}
            <div className="flex absolute bottom-1 w-full justify-center">
              <motion.div
                // className="box"
                whileHover={!diceRolling ? { scale: 1.2 } : 0}
                whileTap={!diceRolling ? { scale: 0.9 } : 0}
                transition={
                  !diceRolling
                    ? { type: "spring", stiffness: 400, damping: 17 }
                    : 0
                }
                className="bg-[#279415] text-white p-2 rounded-full  w-[80%]"
              >
                <button
                  onClick={() => !diceRolling && Playerturn()}
                  disabled={playerWinnerDetails ? true : false}
                  className="flex justify-center w-full"
                >
                  {diceRolling ? "ROLLING..." : "ROLL THE DICE"}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
