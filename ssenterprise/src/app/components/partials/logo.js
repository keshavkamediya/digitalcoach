import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex items-center justify-start'>
            <div className='rounded-full overflow-hidden'>
                <Image alt="Ankit Panwar" src={'/front-image.jpg'} width={50} height={50} priority className='max-h-screen' />
            </div>
            <div className='mx-2'>
                <p className='text-sm'>Ankit Panwar</p>
                <p className='text-sm'>@digitalcoach_ankit</p>
            </div>
        </div>
    )
}

export default Logo