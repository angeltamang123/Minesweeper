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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You Win</DialogTitle>
          <DialogDescription>
            Your Score: {score}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <DialogClose asChild><Button variant='outline' onClick={handleNewGame}>New Game?</Button></DialogClose>
      </DialogFooter>
      </DialogContent>     
    </Dialog>
  )
}

export default Win