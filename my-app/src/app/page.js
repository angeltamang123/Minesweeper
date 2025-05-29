'use client'
import React, { useEffect, useState } from 'react'
import Game from '@/components/game'
import Greeter from '@/components/greeter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Help from '@/components/help'
import { cn } from '@/lib/utils'

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
    <div className='max-h-screen max-w-screen lg-tablets:min-h-screen lg-tablets:min-w-screen flex flex-col grow overflow-visible lg-tablets:items-center lg-tablets:justify-center bg-gradient-to-br from-[#008080] to-[#004040]"'>
        <div className={`lg-tablets:relative absolute w-full h-full lg-tablets:h-max lg-tablets:w-[80%] flex flex-col justify-start items-center bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-2xl`}> 
          <div className="w-full bg-gradient-to-r from-[#0000ff] to-[#000080] text-white px-3 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ff0000] border border-[#800000]"></div>
            <span className="font-bold text-sm font-mono">Minesweeper</span>
          </div>
          <div className="flex gap-1">
            <div className="w-4 h-3 bg-[#c0c0c0] border border-[#808080]"></div>
            <div className="w-4 h-3 bg-[#c0c0c0] border border-[#808080]"></div>
            <div className="w-4 h-3 bg-[#c0c0c0] border border-[#808080]"></div>
          </div>
        </div>
          <Tabs defaultValue={difficulty} className="w-full bg-[#c0c0c0]">
            <TabsList className="w-full bg-[#c0c0c0] border-b-2 border-[#808080] rounded-none p-0">
              <TabsTrigger value="Easy" onClick={(e) => tabCickHandler(e.target.innerText)} 
                className="data-[state=active]:bg-[#c0c0c0] data-[state=active]:border-t-2 data-[state=active]:border-l-2
                 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#c0c0c0]
                  bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-white border-r-white font-mono text-black hover:bg-[#d0d0d0]"
                >Easy</TabsTrigger>
              <TabsTrigger value="Normal" onClick={(e) => tabCickHandler(e.target.innerText)}
                className="data-[state=active]:bg-[#c0c0c0] data-[state=active]:border-t-2 data-[state=active]:border-l-2
                 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#c0c0c0]
                  bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-white border-r-white font-mono text-black hover:bg-[#d0d0d0]"
                >Normal</TabsTrigger>
              <TabsTrigger value="Hard" onClick={(e) => tabCickHandler(e.target.innerText)}
                className="data-[state=active]:bg-[#c0c0c0] data-[state=active]:border-t-2 data-[state=active]:border-l-2
                 data-[state=active]:border-white data-[state=active]:border-r-[#808080] data-[state=active]:border-b-[#c0c0c0]
                  bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-white border-r-white font-mono text-black hover:bg-[#d0d0d0]"
                >Hard</TabsTrigger>
            </TabsList>
            <TabsContent key={`game-easy-${gameKey}`} value="Easy"><Game difficulty="Easy" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
            <TabsContent key={`game-normal-${gameKey}`} value="Normal"><Game difficulty="Normal" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
            <TabsContent key={`game-hard-${gameKey}`} value="Hard"><Game difficulty="Hard" onRestartRequest={handleChangeDifficultyAndRestart} levels={levels} /></TabsContent>
          </Tabs> 
          <div className='w-full h-full flex items-end mt-2 mb-2 lg-tablets:mt-0 lg-tablets:mb-0'>
            <button onClick={()=> setShowHelp(true)} className={`bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] px-3 py-1 font-mono text-sm text-black hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white`}>How to Play?</button>
          </div>
          {showHelp && <Help open={showHelp} onOpenChange={setShowHelp} />}
        </div>
    </div>
  )
}

export default Mine