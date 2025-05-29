"use client"
import React from 'react'
import {motion} from "motion/react"
import { Brain, Flame, Leaf } from 'lucide-react'

const Greeter = ( {handledifficulty}) => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-[#008080] to-[#004040]'>
          <motion.div initial={{scale:0 , opacity:0}} animate={{scale:1, opacity:1}} transition={{duration: 0.25}}  className='flex flex-col gap-6 justify-center items-center h-96 w-96 p-6 bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-2xl"'> 
            <div className="w-full bg-gradient-to-r from-[#0000ff] to-[#000080] text-white px-3 py-1 flex items-center justify-between -mt-6 -mx-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ff0000] border border-[#800000]"></div>
                <span className="font-bold text-sm font-mono">Minesweeper</span>
              </div>
            </div>
            <p className="text-2xl font-bold font-mono text-black mb-2">Choose Difficulty</p>
            
            <div
          onClick={(e) => {
            handledifficulty(e.target.innerText)
          }}
          className="flex justify-between items-center w-3/4 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white cursor-pointer transition-all"
        >
          <button className="p-3 font-mono font-bold text-black flex-1 text-left">Easy</button>
          <Leaf className="fill-green-700 mr-3 size-6" />
        </div>

        <div
          onClick={(e) => {
            handledifficulty(e.target.innerText)
          }}
          className="flex justify-between items-center w-3/4 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white cursor-pointer transition-all"
        >
          <button className="p-3 font-mono font-bold text-black flex-1 text-left">Normal</button>
          <Brain className="fill-orange-500 mr-3 size-6" />
        </div>

        <div
          onClick={(e) => {
            handledifficulty(e.target.innerText)
          }}
          className="flex justify-between items-center w-3/4 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white cursor-pointer transition-all"
        >
          <button className="p-3 font-mono font-bold text-black flex-1 text-left">Hard</button>
          <Flame className="fill-red-600 mr-3 size-6" />
        </div>
          </motion.div>
    </div>
  )
}

export default Greeter