import React, { useState } from "react";
import p1Img from "../Assets/p1.png"
import p2Img from "../Assets/p2.jpg"
function Board() {
  let layers = [];
  let tempStore = [];
    const [player1, setPlayer1] = useState(0)
    const [player2, setPlayer2] = useState(0)
    const [playerTurn, setPlayerTurn] = useState(1)
    const [diceNumber, setDiceNumber] = useState(null)
    const [diceRolling, setDiceRolling] = useState(false)
    // let playerTurn = 1
    const max = 6
    const min = 1
    function rollTheDice(playerTurn){
        let copyPlayer1Postion = player1
        let copyPlayer2Postion = player2
        setDiceRolling(true)
        const diceVal = Math.random() *max
        setTimeout(() => {
       
            if(diceVal.toFixed(0)*1===0){
                setDiceNumber(1)
                setPlayerTurn(playerTurn===1? 2:1)
                playerTurn===1 ? setPlayer1(copyPlayer1Postion+diceVal.toFixed(0)*1) : setPlayer2(copyPlayer2Postion+diceVal.toFixed(0)*1)
            }else{
                setDiceNumber(diceVal.toFixed(0)*1)
                setPlayerTurn(playerTurn===1? 2:1)
                playerTurn===1 ? setPlayer1(copyPlayer1Postion+diceVal.toFixed(0)*1) : setPlayer2(copyPlayer2Postion+diceVal.toFixed(0)*1)
            }
            setDiceRolling(false)
            
            console.log("diceVal",diceVal.toFixed(0)*1)
        },2000)
       
    }

    function Playerturn(){
        if(playerTurn===1){
            return rollTheDice(1)
        }else{
         
            return rollTheDice(2)
        }
    }
    console.log("playerTurn",playerTurn)
  
  let setFirstNumber = [
    {
      startNum: 91,
      endNum: 100,
    },
    {
      startNum: 81,
      endNum: 90,
    },
    {
      startNum: 71,
      endNum: 80,
    },
    {
      startNum: 51,
      endNum: 60,
    },
    {
      startNum: 41,
      endNum: 50,
    },
    {
      startNum: 31,
      endNum: 40,
    },
    {
      startNum: 21,
      endNum: 30,
    },
    {
      startNum: 11,
      endNum: 20,
    },
    {
      startNum: 1,
      endNum: 10,
    },
  ];

  let consequence = [
    {
        position : 2,
        isLadder: true,
        isSnake: false,
        makePosition: 38
    },
    {
        position : 7,
        isLadder: true,
        isSnake: false,
        makePosition: 14
    },
    {
        position : 8,
        isLadder: true,
        isSnake: false,
        makePosition: 31
    },
    {
        position : 15,
        isLadder: true,
        isSnake: false,
        makePosition: 26
    },
    {
        position : 16,
        isLadder: false,
        isSnake: true,
        makePosition: 6
    },
    {
        position : 21,
        isLadder: true,
        isSnake: false,
        makePosition: 42
    },
    {
        position : 28,
        isLadder: true,
        isSnake: false,
        makePosition: 84
    },
    {
        position : 46,
        isLadder: false,
        isSnake: true,
        makePosition: 25
    }
  ]

  setFirstNumber?.map(async (data) => {
    console.log("data", data);
    let ctr = 0;
    for (ctr = data.startNum; ctr <= data.endNum; ctr++) {
      tempStore.push(ctr);
      if (ctr === data.endNum) {
        layers.push(tempStore);
        tempStore = [];
      }
    }
  });
  console.log("tempStore", tempStore);
  console.log("layer1", layers);

  const showBoardFormat = () => {
    return (
        <div className="grid grid-cols-10 gap-4">
        {layers.map((data) => {
            {return data.map((item,index) => {
              return <div className="text-red-600 border h-20 flex flex-col" key={index}>{item} <span className="flex flex-row">{player1 === item&&<img className="h-16" src={p1Img} alt="p1Img"/>} {player2 === item&&<img src={p2Img} className="h-16" alt="p2Img"/>}</span></div>;
            })} 
       
        })}
       </div>
    );
  };
  return <div>
    <span className="text-2xl">{diceRolling ? "Rolling...." : diceNumber}</span>
    {showBoardFormat()}
  <button onClick={Playerturn}>ROLL</button>
  </div>;
}

export default Board;
