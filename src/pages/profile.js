import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProfileComponent from '../components/profile'
export default function Profile() {
    return (
        <div>
            <Navbar />
            <ProfileComponent />
            <Footer />
        </div>
    )
}
