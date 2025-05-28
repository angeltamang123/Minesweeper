"use client"
import React from 'react'
import {motion} from "motion/react"
import { GiCometSpark } from "react-icons/gi";

const Explosion = ({children}) => {
    const style = "absolute"
    const initial = {x:0, y:0, opacity:0}
    const animation1 = {x:0, y:-60, opacity:[0 ,1, 0]}
    const transition = {delay:0.5, duration:2, times: [0, 0.25 , 1]}
    const dragTransition = { timeConstant: 100, power: 7}

    const animation2= {x:-60, y:-60, opacity:[0 ,1, 0]}
    const animation3= {x:-60, y:0, opacity:[0 ,1, 0]}
    const animation4= {x:-60, y:60, opacity:[0 ,1, 0]}
    const animation5= {x:0, y:60, opacity:[0 ,1, 0]}
    const animation6= {x:60, y:60, opacity:[0 ,1, 0]}
    const animation7= {x:60, y:0, opacity:[0 ,1, 0]}
    const animation8= {x:60, y:-60, opacity:[0 ,1, 0]}


  return (
    <div className='flex w-max h-max'>
        {children}
        <motion.div className={style} initial={initial} 
        animate={animation1}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[-130deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation2}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[-180deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation3}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[130deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation4}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[90deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation5}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[45deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation6}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation7}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[-45deg] text-red-800'/>
        </motion.div>

        <motion.div className={style} initial={initial} 
        animate={animation8}
        transition={transition}
        drag
        dragTransition={dragTransition}
        >
            <GiCometSpark className='size-3 rotate-[-90deg] text-red-800'/>
        </motion.div>
    </div>
  )
}

export default Explosion