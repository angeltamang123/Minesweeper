"use client"
import { FlagTriangleLeft, Frown, Laugh, Smile } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { GiLandMine, GiMineExplosion } from "react-icons/gi";
import Explosion from './explosion';
import Loss from './lossDialog';
import Win from './winDialog';

const Game = ({ difficulty , levels , onRestartRequest}) => {
    const [mineGrid, setMineGrid] = useState([])
    const [flags,setFlags] = useState(0);
    const [showLoss, setShowLoss] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [bomb, setBomb] = useState(<GiLandMine className={`${difficulty==="Easy" && 'size-6 -m-1 -ml-1.5'}
            ${difficulty ==="Normal" && 'size-4 mt-0.5 -ml-0.5'} ${difficulty==="Hard" && '-ml-0.5 mt-0.5'}` }/>)

    const [timer, setTimer] = useState(0);
    const correct = useRef(0)
    const [correctCells, setCorrectCells] = useState(null) 

    // For Timer
    useEffect(()=>{ 
      setTimeout(() => {
          if (gameOver) return
          if (gameWon) return
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
        // First obtaining number of correct cells to check win condition
        setCorrectCells(levels[difficulty].rows * levels[difficulty].columns - levels[difficulty].bombs)
        
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
        setShowLoss(true)
        setMineGrid(tempGrid)   
      }
    }, [gameOver])

    // Check for Win Condition
    useEffect(()=>{
      if(!gameOver){
        // Check number of correct clicks
        correct.current = 0
        mineGrid.forEach((row)=>{
          row.forEach((col)=>{
            if(col.displayed === true && col.item !== "bomb"){
              correct.current = correct.current + 1
            } 
          })
        })
        if (correctCells === correct.current){
          setGameWon(true)
        }   
      }
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
      debugger;
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
        // Handles Right click supporting flagging logics, also long pressing on touch is same event contextmenu
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
                // remove flagged if the cell was flagged after cleanup
                if (grid[r][c].flagged){
                  grid[r][c].flagged = false
                  setFlags(prevFlags=>prevFlags+1)
                }

                if (grid[r][c].item === '') {
                  handleSafeCell(grid, r, c)
                }
              }
            }
          }
    }

  return (
    <div className='relative flex flex-col items-center h-full mx-auto w-fit'>
        <div className={`flex justify-between w-full px-2 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]`} >
            <div className={`${difficulty === "Hard" ? 'flex gap-4 items-center px-2 w-35': 'flex flex-col'} justify-between bg-black border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-2 font-mono text-red-500 font-bold`}>
                <p>Seconds </p>
                <p className='text-center'>{timer}</p>
            </div>
            {gameOver ? <Frown className='size-8 my-3 text-black fill-yellow-500' />: !gameWon ? <Smile className='size-8 my-3 text-black fill-yellow-500'/> : <Laugh className='size-8 my-3 text-black fill-yellow-500' />}
            <div className={`${difficulty === "Hard" ? 'flex gap-4 items-center px-2 w-35': 'flex flex-col'} justify-between  bg-black border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-2 font-mono text-red-500 font-bold`}> 
                <p className='flex'>Flags <FlagTriangleLeft className='text-yellow-400 fill-red-600'/></p>
                <p className='text-center'>{flags}</p>
            </div>
        </div>
        <div className={`bg-[#969393] border-4 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-2`}>
            {mineGrid?.length > 0 ?
                (mineGrid.map((item,id)=>{
                return(
                    <div className={`flex ${difficulty==="Normal" && 'ml-0.5'}`} key={id}>
                        {item.map((val, idx)=>{
                            return (
                                <div key={idx} 
                                onClick={(e)=>handleMineClick(id,idx,e)}                       
                                onContextMenu={(e)=>handleMineClick(id,idx,e)} 
                                className={`${difficulty === "Easy" && "h-8 w-8 normal-phones:h-10 normal-phones:w-10 sm:h-10 sm:w-10 sm-laptops:h-10 lg-tablets:w-10 lg-tablets:h-10"} 
                                 ${difficulty === "Normal" && "h-4.5 w-4.5 normal-phones:h-6 normal-phones:w-6 lg-phone:h-6 lg-phones:w-6 sm:h-6 sm:w-6 "} 
                                 ${difficulty === "Hard" && "h-3 w-3 normal-phones:h-3 normal-phones:w-3 lg-phones:h-4.5 lg-phones:w-4.5 sm:h-5 sm:w-5 "}
                                 border-t overflow-hidden border-l text-black border-black 
                                 ${val.displayed ? 'bg-[#808080]' : 'bg-[#C0C0C0]'}`}>
                                {val.displayed? 
                                  <div className={`${difficulty === "Easy" && "ml-2 mt-1 normal-phones:p-2.5 normal-phones:ml-1"} ${difficulty === "Normal" && "ml-1 normal-phones:ml-2 normal-phones:mt-1 text-sm"} ${difficulty === "Hard" && "ml-0.5 -mt-0.5 normal-phones:ml-0.5 normal-phones:-mt-0.5 lg-phones:ml-1 lg-phones:mt-0 sm:ml-1.5 sm:mt-0.5 text-xs"}` }>
                                    {val.item === "bomb" ? (<Explosion>{bomb}</Explosion>)                                 
                                    : val.item}
                                  </div> 
                                : (
                                  <div className='flex flex-col h-full w-full'>
                                    <Image src='/Minesweeper_unopened_square.svg' alt='square' priority width={40} height={30} className='object-fit' />
                                    {val.flagged && <FlagTriangleLeft className={`text-black rotate-[-20deg] fill-red-600 absolute
                                      ${difficulty === "Easy" && 'size-6 mt-2 ml-1.5'}
                                      ${difficulty === "Normal" && 'size-4 mt-1 ml-1'}
                                      ${difficulty === "Hard" && 'normal-phones:size-3 lg-phones:mt-1 sm:size-4 sm:ml-0.5'}
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
        {gameWon && (<Win open={gameWon} onOpenChange={setGameWon} time={timer} difficulty={difficulty} onRestart={onRestartRequest}/>)}
    </div>
  )
}

export default Game