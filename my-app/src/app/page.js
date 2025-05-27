'use client'
import React, { useEffect, useState } from 'react'

const Mine = () => {
    const levels = {
      "Easy":  {
        "columns":9,
        "rows":9,
        "bombs": 10 
      },
      "Hard": {
        "columns":16,
        "rows":16,
        "bombs": 20
      },
      "Very Hard": {
        "columns": 30,
        "rows": 16,
        "bombs": 30
      }
    }

    const [difficulty, setdifficulty] = useState("Easy")
    const [mineGrid, setMineGrid] = useState([])
    const [flags,setFlags] = useState(0);
    const [gameOver, setGameOver] = useState(false)

    const [timer, setTimer] = useState(0);
    useEffect(()=>{ 
      setTimeout(() => {
          setTimer(timer + 1);
      }, 1000);    
    },[timer])


    useEffect(() => {
      if (difficulty) {
        let tempGrid = []
        for (let i = 0; i < levels[difficulty].rows; i++){
          tempGrid[i] = []
          for (let j=0; j < levels[difficulty].columns; j++){
            tempGrid[i][j] = {"displayed": false}
          }
        }
        const initializedGrid = handleInitialization(tempGrid)

        setMineGrid(initializedGrid)
      }

    },[difficulty])

    const handleInitialization = (grid) => {
      let bombs = levels[difficulty].bombs

      // Placing Bombs randomly 
      while (bombs !== 0){
        let row = Math.floor(Math.random()*levels[difficulty].rows)
        let col = Math.floor(Math.random()*levels[difficulty].columns)
        if (!grid[row][col].item){
          grid[row][col] = {...grid[row][col], item:"💣"}
          bombs = bombs - 1
        }
      }

      // Placing counter on blocks for number of bombs in adjacent blocks
      grid.forEach((row, row_index) => {
        row.forEach((cell, cell_index) => {
          if (cell.item !== "💣") {
            let bombCount = 0

            for (let r = row_index - 1; r <= row_index + 1; r++) {
              for (let c = cell_index - 1; c <= cell_index + 1; c++) {
                // Skip current cell and check if cell has bomb, also used optional chaining for accesing 
                // array's out of bound index like -1 which returns undefined
                if (!(r === row_index && c === cell_index) && grid[r]?.[c]?.item === "💣") {
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

    const handleMineClick = (row, col)=> {
      debugger;
      if(gameOver) return;
      const newGrid = [...mineGrid];
      newGrid[row][col].displayed = true;
      if(newGrid[row][col].item == ''){
        handleSafeCell(newGrid, row, col)
      } else if(newGrid[row][col].item === '💣'){
        setGameOver(true)
      }
      setMineGrid(newGrid);
    }

    const handleSafeCell = (grid, row, col) => {
      for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (grid[r]?.[c] !== undefined && !(r === row && c === col) && grid[r]?.[c]?.item !== "💣" && !grid[r]?.[c]?.displayed){
                grid[r][c].displayed = true
                if (grid[r][c].item === '') {
                  handleSafeCell(grid, r, c)
                }
              }
            }
          }
    }


  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <p>Seconds: {timer}</p>
        <p>Flags: {flags}</p>
        {gameOver && <p className='text-red-600'>Game Over! You clicked on a mine!</p>}
        {mineGrid?.length > 0 ? 
          (mineGrid.map((item,id)=>{
            return(
              <div className='flex' key={id}>
                  {item.map((val, idx)=>{
                      return (
                          <div key={idx} onClick={()=>handleMineClick(id,idx)} className={` p-3 h-10 w-10 border text-black border-black ${val.displayed ? 'bg-[#808080]' : 'bg-[#C0C0C0] rounded-sm shadow-2xl'}`}>
                              {val.displayed? val.item : ''}
                              </div>
                      )
                  })}
              </div>
            )
        })) : null}
    </div>
  )
}

export default Mine