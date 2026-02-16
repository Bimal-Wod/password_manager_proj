import React from 'react'
import githubIcon from '../assets/github.svg'

const Navbar = () => {
    return (
        <nav className='bg-slate-700  '>
            <div className="mycontainer flex justify-between items-center
    px-3 h-8 py-2">

                

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP&gt;</span>
                </div>
                <div className='items-center text-2xl text-blue-500'><h1>Bimal Wod</h1></div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:cursor-pointer' href="/">Home</a>
                        <a className='hover:cursor-pointer' href="/">About</a>
                        <a className='hover:cursor-pointer' href="/">Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-green-800 my-5 rounded-md flex gap-2
                justify-between items-center ring-white ring-1'>
                    <img className='invert w-10 p-2' src={githubIcon} alt="github" />
                    <span className='font-bold px-1'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
