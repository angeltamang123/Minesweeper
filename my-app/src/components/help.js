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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#4B421B] items-center">
        <DrawerHeader>
          <DrawerTitle className="font-bold text-2xl">Minesweeper Guide</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-bold">Left-Click</h3>
            <p>Reveal a square. Mines = Game Over, Numbers = nearby mines.</p>
          </div>

          <div>
            <h3 className="font-bold">Right-Click</h3>
            <p>Place/remove 🚩 to mark suspected mines.</p>
          </div>

          <div>
            <h3 className="font-bold">Numbers</h3>
            <ul className="list-disc pl-5">
              <li><strong>"1"</strong>: 1 mine in adjacent squares.</li>
              <li><strong>"2"</strong>: 2 mines nearby, etc.</li>
              <li><strong>""</strong>: Safe to click surrounding squares.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Tips</h3>
            <p>Flag cell with adjacents as number</p>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-100 cursor-pointer hover:bg-[#D7EAE2] hover:text-[#4B421B] hover:shadow-2xl hover:shadow-gray-400">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Help