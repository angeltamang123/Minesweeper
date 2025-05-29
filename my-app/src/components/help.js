"use client"
import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button" 

const Help = ({ open, onOpenChange }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} cas>
      <DrawerContent className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] items-center h-[100%]">
        <DrawerHeader>
          <DrawerTitle className="font-bold text-2xl font-mono text-black">Minesweeper Guide</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-2 max-w-lg">
          <div className='bg-white border-2 p-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white'>
            <h3 className="font-bold font-mono text-black ml-2">Left-Click / Tap</h3>
            <p className='font-mono text-sm text-black ml-2'>Reveal a square. Mines = Game Over, <br/> Numbers = nearby mines.</p>
          </div>

          <div className='bg-white border-2 p-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white'>
            <h3 className="font-bold font-mono text-black ml-2">Right-Click / Hold for Touch Screens</h3>
            <p className='font-mono text-sm text-black ml-2'>Place/remove 🚩 to mark suspected mines.</p>
          </div>

          <div className='bg-white border-2 p-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white'>
            <h3 className="font-bold font-mono text-black ml-2">Numbers</h3>
            <ul className="list-disc pl-5 font-mono text-sm text-black ml-2">
              <li><strong>"1"</strong>: 1 mine in adjacent squares.</li>
              <li><strong>"2"</strong>: 2 mines nearby, etc.</li>
              <li><strong>""</strong>: Safe to click surrounding squares.</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-3">
            <h3 className="font-bold font-mono text-black ml-2">Tips</h3>
            <p className="font-mono text-sm text-black ml-2">Flag cell with adjacents as number</p>
          </div>
        </div>

        <DrawerFooter className="-mt-3">
          <DrawerClose asChild>
            <Button variant="outline" className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080]
             border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] 
             active:border-r-white active:border-b-white font-mono font-bold text-black">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Help