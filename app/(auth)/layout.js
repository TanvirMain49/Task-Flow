import React from 'react'

export default function layout({ children }) {
    return (
        <div className='flex justify-center pt-20 pb-8'>
            {children}
        </div>
    )
}
