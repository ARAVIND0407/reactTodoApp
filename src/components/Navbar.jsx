import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex bg-slate-900 text-white md:justify-around justify-between py-2 fixed top-0 left-0 w-[100vw]'>
        <div className="logo">
            <span className='font-bold md:text-xl md:mx-9 mx-3 cursor-pointer'>Taskify 2.0</span>
        </div>
        <ul className='flex justify-between gap-4 md:mx-9 mx-3'>
            <li className='cursor-pointer hover:text-violet-400 hover:scale-105 transition-all duration-500'>Home</li>
            <li className='cursor-pointer hover:text-violet-400 hover:scale-105 transition-all duration-500'>Your Todos</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
