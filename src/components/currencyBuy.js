import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../api';
import { message } from 'antd';

export default function CurrencyBuyComp() {
    const [unit, setUnit] = useState(0);
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");
    const [loading, setLoading] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0)
    const { user, setUser } = useContext(UserContext)

    const location = useLocation();
    const param = location.pathname.substring(1)
    window.onload = () => {
        setCurrency(param)
        console.log({ param })
    }
    useEffect(() => {
        if (user === null) navigate('/')
        // const param = window.location.href.split('/').substring(this.href.lastIndexOf('/') + 1)


        console.log({ param })
        fetchPrice()
        fetchAmount()
    }, [unit])

    let navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    const fetchAmount = async () => {
        try {
            console.log({ amount, unit, currentPrice })
            // if (!isNaN(unit)) {
            const usdAmount = unit * currentPrice
            setAmount(parseFloat(usdAmount))

        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
        }
    }
    const fetchPrice = async () => {
        try {
            console.log("FETCH PRICE =>>>");
            // const param = window.location.href.split('/').substring(this.href.lastIndexOf('/') + 1)


            const { data } = await axios.get(`${API}/latest-data`,
                { headers: { token: token } },);
            console.log(data);
            if (data.success === false) throw Error(data.message);
            setCurrency(param)
            setCurrentPrice(data.rates[param])
        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // return

            const { data } = await axios.post(`${API}/buy`,
                {
                    "currency": currency,
                    "amount": `${amount}`
                },
                { headers: { token: token } },);
            console.log("buy request queued", data);
            if (data.success == false) {
                console.log(data.message)
                throw Error(data.message)
            }
            toast.success(" Buy request queued ");
            setLoading(false);
            setUnit(0)
            navigate('/');
        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading(false);
        }
    }

    return (
        <div className="m-3" style={{ minHeight: '80vh' }}>
            {/* {user === null ? 'NULL' : 'else'} */}
            <h1 className="text-center square mb-3 mt-3">Buy Instrument</h1>
            <form
                onSubmit={handleSubmit}
            >
                <h2> Current Payable Amount: {amount}</h2>
                <h2> Current Price per unit: {currentPrice}</h2>
                <input
                    type="number"
                    className="form-control mb-4 p-4"
                    value={unit}
                    min={0}
                    defaultValue={0}
                    onChange={(e) => {
                        if (e.target.value === "") setUnit(0)
                        else setUnit(parseFloat(e.target.value))
                    }
                    }
                    placeholder="Enter Total number of units you want to buy"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-block btn-primary form-control width100 p-2 getting-started"
                    disabled={!unit || loading}
                    style={{
                        backgroundColor: "#0066FF",
                        borderColor: "#2E47FF",
                        color: "white",
                    }}
                >

                    {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
            </form>
        </div>
    )
}
