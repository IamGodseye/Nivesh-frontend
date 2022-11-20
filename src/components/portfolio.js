import React, { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PortfolioComponent() {
    const [loading, setLoading] = useState("");

    const [ok, setOk] = useState(false);
    const [portfolio, setPortfolio] = useState();
    const { user, setUser } = useContext(UserContext)


    let navigate = useNavigate()
    useEffect(() => {
        if (user === null) navigate('/')
        fetchPortfolio()
    }, [])

    const token = JSON.parse(localStorage.getItem('token'))

    const fetchPortfolio = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("FETCH PORTFOLIO =>>>");
            const { data } = await axios.get(`${API}/get-portfolio`,
                { headers: { token: token } },);
            console.log(data);
            if (data.success === true) setOk(true);
            setPortfolio(data.portfolio)
        } catch (err) {
            console.log(err);
            setOk(false);
            navigate("/login");
        }
    };
    return (
        <>
            WalletComponent
            <div className=' d-flex justify-content-center flex-column' >
                <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>

                    <div class="card">
                        <div class="card-header">
                            Portfolio Detail
                            <br>
                            </br>
                        </div>
                        <div class="card-body">
                            {JSON.stringify(portfolio)}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
