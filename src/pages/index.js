import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import CryptoDashboard from '../components/dashboard'
export default function Index() {
    return (
        <div>
            <Navbar />
            <CryptoDashboard />
            <Footer />
        </div>
    )
}
