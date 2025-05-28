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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You Lose</DialogTitle>
          <DialogDescription>
            You correctly flagged {correctFlags.current} mine/s !!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <DialogClose asChild><Button variant='outline' onClick={handleTryAgain}>Try Again?</Button></DialogClose>
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}

export default Loss