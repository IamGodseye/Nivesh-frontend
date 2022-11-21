import React, { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function WalletComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [amount, setAmount] = useState(1000);
    const [ok, setOk] = useState(false);
    const [wallet, setWallet] = useState();
    const { user, setUser } = useContext(UserContext)


    let navigate = useNavigate()
    useEffect(() => {
        if (user === null) navigate('/')
        fetchWallet()
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("FETCH USER =>>>");
            const { data } = await axios.get(`${API}/get-profile`,

                { headers: { token: token } },);
            console.log(data);
            // setWalletId(data.user.walletId)
            setUser(data.user)
            if (data.success !== true) {
                throw Error("User data corrupted...plz Login again")
            }
        } catch (err) {
            console.log(err);
            // setOk(false);
            navigate("/login");
        }
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        const userId = user._id
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
        const uniqueId = uuidv4()
        const result = await axios.post(`${API}/create-order`, {
            amount: 100,
            id: userId
        });

        if (!result) {
            alert('Server error. Are you online?');
            return;
        }
        console.log({ result })
        const { amount, order_id, currency } = result.data;

        const options = {
            key: 'rzp_test_HZ6gv3qbhJJHp3', // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: 'Test Corp.',
            description: 'Test Transaction',
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    id: userId,
                    amount: amount
                };
                console.log({ data })
                const result = await axios.post(`${API}/verify-payment`, data);

                alert(result.data.msg);
            },
            prefill: {
                name: 'TEMPLATE NAMe',
                email: 'example@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Example Corporate Office',
            },
            theme: {
                color: '#61dafb',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    const token = JSON.parse(localStorage.getItem('token'))

    const fetchWallet = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("FETCH USER =>>>");
            const { data } = await axios.get(`${API}/get-wallet`,
                { headers: { token: token } },);
            console.log(data);
            if (data.success === true) setOk(true);
            setWallet(data.wallet)
        } catch (err) {
            console.log(err);
            setOk(false);
            navigate("/login");
        }
    };
    return (
        <>
            WalletComponent
            <div className=' d-flex justify-content-center flex-column' style={{ minHeight: '80vh' }}>
                <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>

                    <div class="card">
                        <div class="card-header">
                            Wallet Detail
                            <br>
                            </br>
                            {JSON.stringify(wallet)}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                User Wallet Id: {user.walletId}
                                <br></br>
                                Email: {user.email}
                                {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary nav-link m-2" style={{ color: 'white' }} onClick={displayRazorpay}> Add money </button>
                </div >

            </div>
        </>
    )
}
