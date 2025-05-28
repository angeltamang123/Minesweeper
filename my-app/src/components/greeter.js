"use client"
import React from 'react'
import {motion} from "motion/react"
import { Brain, Flame, Leaf } from 'lucide-react'

const Greeter = ( {handledifficulty}) => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-[#4B421B]'>
          <motion.div initial={{scale:0 , opacity:0}} animate={{scale:1, opacity:1}} transition={{duration: 0.25}}  className='flex flex-col gap-4 justify-center border rounded-md items-center h-80 w-80 p-1 bg-[#D7EAE2]'> 
            <p className='text-2xl font-bold font-sans -mt-20 text-black'>Minesweeper</p>
            <div className='-mb-2'><p className='text-black'>Choose the game difficulty.</p></div>
            <div onClick={(e)=>{handledifficulty(e.target.innerText)}} className='flex justify-between border rounded shadow-black shadow-md hover:bg-[#4B421B] w-1/2 border-gray-800 items-center cursor-pointer'><button className='p-1 ml-2 text-black' >Easy</button> <Leaf className='fill-green-700 mr-2'/></div>
            <div onClick={(e)=>{handledifficulty(e.target.innerText)}} className='flex justify-between border rounded shadow-black shadow-md hover:bg-[#4B421B] w-1/2 border-gray-800 items-center cursor-pointer'><button className='p-1 ml-2 text-black' >Normal</button> <Brain className='fill-orange-500 mr-2'/></div>
            <div onClick={(e)=>{handledifficulty(e.target.innerText)}} className='flex justify-between border rounded shadow-black shadow-md hover:bg-[#4B421B] w-1/2 border-gray-800 items-center cursor-pointer'><button className='p-1 ml-2 text-black' >Hard</button><Flame className='fill-red-600 mr-2'/> </div>
          </motion.div>
    </div>
  )
}

export default Greeter