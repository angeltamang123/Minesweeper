'use client'
import React, { useEffect, useState } from 'react'
import Game from '@/components/game'
import Greeter from '@/components/greeter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Help from '@/components/help'

const Mine = () => {
    const levels = {
      "Easy":  {
        "columns":9,
        "rows":9,
        "bombs": 10
      },
      "Normal": {
        "columns":16,
        "rows":16,
        "bombs": 40
      },
      "Hard": {
        "columns": 30,
        "rows": 16,
        "bombs": 99
      }
    }

    const [difficulty, setDifficulty] = useState(null)
    const [showHelp, setShowHelp] = useState(false);

    // Give Unique key to each Game mode and for resetting
    const [gameKey, setGameKey] = useState(0);

     const handleChangeDifficultyAndRestart = (newDifficulty) => {
      setDifficulty(newDifficulty);
      setGameKey(prevKey => prevKey + 1); // Increment key to force Game remount
    }

    if (!difficulty){
      return (
        <Greeter handledifficulty={handleChangeDifficultyAndRestart} />
      )
    }

    const tabCickHandler = (e) => {
      setDifficulty(e)
    }

  return (
    <div className='min-h-screen flex flex-col grow justify-center items-center bg-[#4B421B]'>
        <div className={`h-[570px] -mt-2 w-[40%] ${difficulty === "Hard" && 'w-[60%]'} flex flex-col justify-start items-center bg-[#D7EAE2]`}> 
          <p className='text-2xl font-bold font-sans text-black'>Minesweeper</p>
          <Tabs defaultValue={difficulty} className="w-full">
            <TabsList className="w-full border-t-2 border-b-2 -mb-1.5 border-black bg-[#D7EAE2] rounded-none focus:bg-gray-700">
              <TabsTrigger value="Easy" onClick={(e) => tabCickHandler(e.target.innerText)}>Easy</TabsTrigger>
              <TabsTrigger value="Normal" onClick={(e) => tabCickHandler(e.target.innerText)}>Normal</TabsTrigger>
              <TabsTrigger value="Hard" onClick={(e) => tabCickHandler(e.target.innerText)}>Hard</TabsTrigger>
            </TabsList>
            <TabsContent key={`game-easy-${gameKey}`} value="Easy"><Game difficulty="Easy" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
            <TabsContent key={`game-normal-${gameKey}`} value="Normal"><Game difficulty="Normal" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
            <TabsContent key={`game-hard-${gameKey}`} value="Hard"><Game difficulty="Hard" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
          </Tabs> 
          <button onClick={()=> setShowHelp(true)} className={`text-end cursor-pointer text-green-600 hover:text-shadow-md w-full ${difficulty === "Normal" && 'mt-8'} ${difficulty === "Easy" && 'mt-6'} ${difficulty === "Hard" && 'mt-2'} mr-8`}>How to Play?</button>
          {showHelp && <Help open={showHelp} onOpenChange={setShowHelp} />}
        </div>
    </div>
  )
}

export default Mine