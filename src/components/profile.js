import React, { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { useEffect } from 'react';

export default function ProfileComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (user === null) navigate('/')
    }, [])

    return (
        <div>
            ProfileComponent

            <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>

                <div class="card">
                    <div class="card-header">
                        User Detail
                        <br>
                        </br>
                        {JSON.stringify(user)}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            User Wallet Id: {user.walletId}
                            <br></br>
                            Balance: {user.email}
                            {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                        </blockquote>
                    </div>
                </div>

            </div >
        </div>
    )
}
