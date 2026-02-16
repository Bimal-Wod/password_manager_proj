import React from 'react'
import heartIcon from '../assets/heart.svg'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col
    items-center justify-center fixed bottom-0 w-full'>
        <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP&gt;</span>
                </div>
     
      <div className="flex justify-center items-center">
        Created with <img className='w-8 mx-2 bg-pink-800 rounded-full' src={heartIcon} alt="heart" /> by Bimal_Wod
      </div>
    </div>
  )
}

export default Footer
