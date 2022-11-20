import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import WalletComponent from '../components/wallet'
export default function Wallet() {
    return (
        <div>
            <Navbar />
            <WalletComponent />
            <Footer />
        </div>
    )
}
