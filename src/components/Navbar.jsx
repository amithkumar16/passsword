import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-600 flex justify-between items-center
    px-4'>
    <div className="logo"><h1 className="text-3xl text-white font-bold">
        <span className='text-green-700'>&lt;</span>
        <span>Pass</span><span className='text-green-700'>
        OP/&gt;
        </span>
    </h1></div>
    

    <div className='bg-green-600 rounded-lg p-1'>
        <button className='flex gap-1 invert bg-transparent'>
            <img src="download.png" width={30} alt="" />
            <span className='font-bold'>Github</span></button>
    </div>
   </nav>
  )
}

export default Navbar
