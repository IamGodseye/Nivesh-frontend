import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

import Orders from '../components/orders'

export default function OrderDashboard() {
    return (
        <div>
            <Navbar />
            <Orders />
            <Footer />
        </div>
    )
}
