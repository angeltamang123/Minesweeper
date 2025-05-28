'use client'
import React, { useState } from 'react'
import Game from '@/components/game'
import Greeter from '@/components/greeter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

    const [difficulty, setdifficulty] = useState(null)

    const handledifficulty = (e) => {
      setdifficulty(e)
    }

    if (!difficulty){
      return (
        <Greeter handledifficulty={handledifficulty} />
      )
    }

  return (
    <div className='min-h-screen flex flex-col grow justify-center items-center bg-[#4B421B]'>
        <div className={`h-full w-[40%] ${difficulty === "Hard" && 'w-[60%]'} flex flex-col justify-center items-center bg-[#D7EAE2]`}> 
          <Tabs defaultValue={difficulty} className="w-full ">
            <TabsList className="w-full bg-[#D7EAE2] rounded-none focus:bg-gray-700">
              <TabsTrigger className="focus:bg-gray-700 " value="Easy" onClick={(e)=>{handledifficulty(e.target.innerText)}}>Easy</TabsTrigger>
              <TabsTrigger value="Normal" onClick={(e)=>{handledifficulty(e.target.innerText)}}>Normal</TabsTrigger>
              <TabsTrigger value="Hard" onClick={(e)=>{handledifficulty(e.target.innerText)}}>Hard</TabsTrigger>
            </TabsList>
            <TabsContent value="Easy"><Game difficulty={difficulty} levels={levels}/></TabsContent>
            <TabsContent value="Normal"><Game difficulty={difficulty} levels={levels}/></TabsContent>
            <TabsContent value="Hard"><Game difficulty={difficulty} levels={levels}/></TabsContent>
          </Tabs>
          
        </div>
    </div>
  )
}

export default Mine