import React from 'react'
import Navbar from './Navbar'
import Welcome from './Welcome'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
