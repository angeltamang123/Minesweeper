"use client"
import { FlagTriangleLeft, Frown, Smile } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { GiLandMine, GiMineExplosion } from "react-icons/gi";
import Explosion from './explosion';
import Loss from './lossDialog';

const Game = ({ difficulty , levels , onRestartRequest}) => {
    const [mineGrid, setMineGrid] = useState([])
    const [flags,setFlags] = useState(0);
    const [score, setScore] = useState(0);
    const [showLoss, setShowLoss] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [bomb, setBomb] = useState(<GiLandMine className={`${difficulty==="Easy" && 'size-6 -m-1 -ml-1.5'}
            ${difficulty ==="Normal" && 'size-4 mt-0.5 -ml-0.5'} ${difficulty==="Hard" && '-ml-0.5 mt-0.5'}` }/>)

    const [timer, setTimer] = useState(0);
    

    // For Timer
    useEffect(()=>{ 
      setTimeout(() => {
          if (gameOver) return
          if (gameStart) setTimer(timer + 1);
      }, 1000);    
    },[timer, gameStart])

    // For setting flags according to difficulty
    useEffect(()=>{
      if(difficulty){
        setFlags(levels[difficulty].bombs)
      }
    },[difficulty, levels])

    // Initialization after difficulty is set
    useEffect(() => {
      if (difficulty) {
        let tempGrid = []
        for (let i = 0; i < levels[difficulty].rows; i++){
          tempGrid[i] = []
          for (let j=0; j < levels[difficulty].columns; j++){
            tempGrid[i][j] = {"displayed": false, "flagged": false}
          }
        }
        const initializedGrid = handleInitialization(tempGrid, difficulty)

        setMineGrid(initializedGrid)
      }

    },[difficulty])

    // Show different bomb after bomb clicked and display all
    useEffect(()=> {
      if(gameOver){
        setTimeout(() => {
          setBomb(<GiMineExplosion className={`text-red-800 ${difficulty==="Easy" && 'size-6 -m-1 -ml-1.5'}
            ${difficulty ==="Normal" && 'size-4 mt-0.5 -ml-0.5'} ${difficulty==="Hard" && '-ml-0.5 mt-0.5'}`}/>)
        }, 400)
        const tempGrid = [...mineGrid]
        tempGrid.forEach((row, id) => {
          row.forEach((col, idx) => {
            tempGrid[id][idx].displayed = true
          })
        })

        setMineGrid(tempGrid)
        setShowLoss(true)
      
      }
    }, [gameOver])

    // Check for Win Condition
    useEffect(()=>{
      
    }, [mineGrid])

    const handleInitialization = (grid, difficulty) => {
      let bombs = levels[difficulty].bombs

      // Placing Bombs randomly 
      while (bombs !== 0){
        let row = Math.floor(Math.random()*levels[difficulty].rows)
        let col = Math.floor(Math.random()*levels[difficulty].columns)
        if (!grid[row][col].item){
          grid[row][col] = {...grid[row][col], item:"bomb"}
          bombs = bombs - 1
        }
      }

      // Placing counter on blocks for number of bombs in adjacent blocks
      grid.forEach((row, row_index) => {
        row.forEach((cell, cell_index) => {
          if (cell.item !== "bomb") {
            let bombCount = 0

            for (let r = row_index - 1; r <= row_index + 1; r++) {
              for (let c = cell_index - 1; c <= cell_index + 1; c++) {
                // Skip current cell and check if cell has bomb, also used optional chaining for accesing 
                // array's out of bound index like -1 which returns undefined
                if (!(r === row_index && c === cell_index) && grid[r]?.[c]?.item === "bomb") {
                  bombCount++;
                }
              }
            }

            // Defining the cell according to adjacent bomb count
            if (bombCount == 0){
              grid[row_index][cell_index] = {...grid[row_index][cell_index], item:""}
            }
            else{
              grid[row_index][cell_index] = {...grid[row_index][cell_index], item:bombCount}
            }
          }
        })
      })

      // Returning initialized Grid
      return grid
    }

    const handleMineClick = (row, col, e)=> {
      if(gameOver){
        setGameStart(false)
        return
      }else{
        setGameStart(true)
      }
      const newGrid = [...mineGrid];
      // Handles left Click
      if(e.type === 'click'){
        if (newGrid[row][col].flagged) return; // Cannot left-click on flagged cells
        newGrid[row][col].displayed = true;
        if(newGrid[row][col].item == ''){
          handleSafeCell(newGrid, row, col)
        } else if(newGrid[row][col].item === 'bomb'){        
          setGameOver(true)
        }
        setMineGrid(newGrid);
      }
      else if (e.type === 'contextmenu'){
        // Handles Right click supporting flagging logics
        e.preventDefault()
        if (newGrid[row][col].displayed) return; // Cannot flag displayed cells
        if (!newGrid[row][col].flagged){         
          if (flags > 0) {
            newGrid[row][col].flagged = true
            setFlags(flags-1)
          }
        }else{
          newGrid[row][col].flagged = false
          setFlags(flags+1)
        }
       
        setMineGrid(newGrid)
      }
    }

    const handleSafeCell = (grid, row, col) => {
      for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (grid[r]?.[c] !== undefined && !(r === row && c === col) && grid[r]?.[c]?.item !== "bomb" && !grid[r]?.[c]?.displayed){
                grid[r][c].displayed = true
                if (grid[r][c].item === '') {
                  handleSafeCell(grid, r, c)
                }
              }
            }
          }
    }


  return (
    <div className='relative flex flex-col items-center h-full w-full'>
        <div className={`flex justify-between w-[73%] ${difficulty === "Hard" && 'w-[95%]'} px-2 py-1 bg-gray-600 text-black border-2 border-black rounded shahow-xl `} >
            <div className={`${difficulty === "Hard" ? 'flex gap-4 items-center px-2 w-30': 'flex flex-col'} justify-between border-2 border-black p-1 rounded shadow-black shadow-sm text-white`}>
                <p>Seconds </p>
                <p className='text-center'>{timer}</p>
            </div>
            {gameOver ? <Frown className='size-8 my-3 text-black fill-yellow-500' />: <Smile className='size-8 my-3 text-black fill-yellow-500'/>}
            <div className={`${difficulty === "Hard" ? 'flex gap-4 items-center px-2 w-30': 'flex flex-col'} justify-between  border-2 border-black p-1 rounded shadow-black shadow-sm text-white`}> 
                <p className='flex'>Flags <FlagTriangleLeft className='text-yellow-400 fill-red-600'/></p>
                <p className='text-center'>{flags}</p>
            </div>
        </div>
        <div className={`w-[73%] ${difficulty === "Hard" && 'w-[95%]'} px-1 py-1 bg-gray-600 text-black border-2 border-black rounded shahow-xl shadow-black`}>
            {mineGrid?.length > 0 ?
                (mineGrid.map((item,id)=>{
                return(
                    <div className='flex' key={id}>
                        {item.map((val, idx)=>{
                            return (
                                <div key={idx} 
                                onClick={(e)=>handleMineClick(id,idx,e)} 
                                onContextMenu={(e)=>handleMineClick(id,idx,e)} 
                                className={`${difficulty === "Easy" && "h-10 w-10"} ${difficulty === "Normal" && "h-5.5 w-6"} ${difficulty === "Hard" && "h-6 w-6"} border-t overflow-hidden border-l text-black border-black ${val.displayed ? 'bg-[#808080]' : 'bg-[#C0C0C0]'}`}>
                                {val.displayed? 
                                  <div className={`${difficulty === "Easy" && "p-2.5 ml-1"} ${difficulty === "Normal" && "ml-1"} ${difficulty === "Hard" && "ml-1.5"}` }>
                                    {val.item === "bomb" ? (<Explosion>{bomb}</Explosion>)                                 
                                    : val.item}
                                  </div> 
                                : (
                                  <div className='flex flex-col'>
                                    <Image src='/Minesweeper_unopened_square.svg' alt='square' priority width={40} height={30} className='object-fit' />
                                    {val.flagged && <FlagTriangleLeft className={`text-black rotate-[-20deg] fill-red-600 absolute
                                      ${difficulty === "Easy" && 'size-6 mt-2 ml-1.5 z-10'}
                                      ${difficulty === "Normal" && 'size-4 mt-1'}
                                      ${difficulty === "Hard" && 'size-4 mt-1 ml-0.5'}
                                      `}/>}
                                  </div>
                                )}
                                </div>
                            )
                        })}
                    </div>
                )
            })) : null}
        </div>

        {showLoss && (<Loss grid={mineGrid} open={showLoss} onOpenChange={setShowLoss} difficulty={difficulty} onRestart={onRestartRequest}/>)}
    </div>
  )
}

export default Game