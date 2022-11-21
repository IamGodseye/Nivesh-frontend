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
    const [ok, setOk] = useState(false);
    const { user, setUser } = useContext(UserContext)


    let navigate = useNavigate()
    useEffect(() => {
        if (user === null) navigate('/')
        fetchUser()
    }, [])

    const token = JSON.parse(localStorage.getItem('token'))

    const createWallet = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("CREATE WALLET=>>>");
            const { data } = await axios.get(`${API}/create-wallet`,

                { headers: { token: token } },);
            console.log(data);
            if (!data.success) {
                console.log(data.message)
                throw Error(data.message)
            }
            navigate('/wallet')
        } catch (err) {
            console.log(err);
            setOk(false);
            navigate("/login");
        }
    }
    const fetchUser = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("FETCH USER =>>>");
            const { data } = await axios.get(`${API}/get-profile`,

                { headers: { token: token } },);
            console.log(data);
            if (data.ok === true) setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            navigate("/login");
        }
    };
    return (
        <>
            ProfileComponent
            <div className=' d-flex justify-content-center flex-column p-5' style={{ height: '80vh' }} >
                <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>

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
                </div>
                <div>
                    {user["walletId"] !== undefined ? <button class="btn btn-primary nav-link m-2" style={{ color: 'white' }} onClick={() => navigate('/wallet')}> Go to Wallet</button> : <button class="btn btn-primary nav-link m-2" style={{ color: 'white' }} onClick={createWallet}> Create Wallet</button>}
                </div >

            </div>
        </>
    )
}
