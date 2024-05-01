import React from 'react'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center justify-center py-5'>
            <p className='text-2xl text-center font-medium'>Want to get special offers and Course updates ?</p>
            <div className='w-full p-4 max-w-[500px]'>
                <div className='my-3 w-full flex text-slate-950 bg-white p-1 ring-2 ring-amber-500 rounded-full overflow-hidden ring-offset-2 ring-offset-slate-950 focus-within:bg-slate-100'>
                    <input type="email" placeholder='Enter your E-mail' className='outline-none p-2 text-base bg-transparent w-full' name="newsletter" id="newsletter" />
                    <button className='bg-amber-500 px-3 py-1 font-medium rounded-full'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Newsletter