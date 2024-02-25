import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex bg-slate-900 text-white justify-around py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9 cursor-pointer'>Taskify 2.0</span>
        </div>
        <ul className='flex justify-between gap-4 mx-9'>
            <li className='cursor-pointer hover:text-red-500 hover:scale-105 transition-all duration-500'>Home</li>
            <li className='cursor-pointer hover:text-red-500 hover:scale-105 transition-all duration-500'>Your Todos</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
