"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

const Win = ({open, onOpenChange, time, difficulty, onRestart }) => {
  const [score, setScore] = useState(0);
  const multiplier = {
    "Easy": 1,
    "Normal": 2,
    "Hard": 3
  }
  useEffect(()=>{
    if(open) {
        if (time < 60){
            setScore(100 * multiplier[difficulty] * (120-time))
        }else if (time < 120){
            setScore(20 * multiplier[difficulty] * (360-time))
        }else if (time < 240){
            setScore(13 * multiplier[difficulty] * (480-time))
        }else{
            setScore(2 * multiplier[difficulty] (1800-time))
        }
    }
  },[open])

  const handleNewGame = () => {
    if (onRestart) onRestart(difficulty);         
  }

  const handleOpenChange = (newOpenState) => {
    if (!newOpenState) {
     onRestart(difficulty)
    }
    onOpenChange(newOpenState)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080]">
        <div className="w-full bg-gradient-to-r from-[#0000ff] to-[#000080] text-white px-3 py-1 flex items-center justify-between -mt-6 -mx-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ff0000] border border-[#800000]"></div>
            <span className="font-bold text-sm font-mono">Congratulations!</span>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="font-mono font-bold text-black">You Win</DialogTitle>
          <DialogDescription className="font-mono text-black"> 
            Your Score: {score}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <DialogClose asChild><Button variant='outline' onClick={handleNewGame}
          className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0]
           active:border-t-[#808080] active:border-l-[#808080]
           active:border-r-white active:border-b-white font-mono font-bold text-black"
          >New Game?</Button></DialogClose>
      </DialogFooter>
      </DialogContent>     
    </Dialog>
  )
}

export default Win