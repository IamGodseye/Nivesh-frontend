import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import CurrencyBuyComp from '../components/currencyBuy'

export default function CurrencyBuy() {
    return (
        <div>
            <Navbar />
            <CurrencyBuyComp />
            <Footer />
        </div>
    )
}
