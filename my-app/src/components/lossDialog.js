"use client"
import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

const Loss = ({grid, open, onOpenChange, difficulty, onRestart }) => {
  const correctFlags = useRef(0)
  useEffect(()=>{
    if(open){
      correctFlags.current = 0;
      grid.forEach((row)=> {
        row.forEach((col)=>{
          if (col.item === "bomb" && col.flagged) correctFlags.current= correctFlags.current+1
        })
      })
    }
  },[open, grid])

  const handleTryAgain = () => {
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
            <span className="font-bold text-sm font-mono">Game Over</span>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="font-mono font-bold text-black">You Lose</DialogTitle>
          <DialogDescription className="font-mono text-black">
            Your suspicion on {correctFlags.current} mine/s was correct!!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <DialogClose asChild><Button className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] 
           border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080]
           active:border-l-[#808080] active:border-r-white active:border-b-white font-mono font-bold text-black" variant='outline' onClick={handleTryAgain}>Try Again?</Button></DialogClose>
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}

export default Loss