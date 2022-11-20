import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Table } from 'antd';

export default function CryptoDashboard() {
    const [currencies, setCurrencies] = useState(null)
    const [loading, setLoading] = useState("");

    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        if (!currencies)
            fetchPrices();
    }, [currencies])
    let navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const fetchPrices = async () => {
        try {
            const { data } = await axios.get(`${API}/latest-data`);
            if (!data.success) {
                // console.log(data.message)
                throw Error(data.message)
            }
            const { rates } = data

            const modifiedRates = []
            for (const key of Object.keys(rates)) {
                let r = {
                    'currencySymbol': key,
                    'latestPrice': rates[key]
                }
                modifiedRates.push(r)
            }

            console.log(rates)

            setCurrencies(modifiedRates);

        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading(false);
            setCurrencies(null);
        }
    }

    const columns = [
        {
            title: 'Currency Symbol',
            dataIndex: 'currencySymbol',
            key: 'currencySymbol',
        },
        {
            title: 'Latest Price',
            dataIndex: 'latestPrice',
            key: 'latestPrice',
        },
        {
            title: 'Buy',
            key: 'buy',
            dataIndex: 'buy',
            render: (text, record) => (
                <button onClick={() => navigate(`/${record.currencySymbol}`)}>
                    {"Buy"}
                </button>
            ),
        },
    ]
    return (
        <div className="m-3" style={{ minHeight: '80vh' }}>
            {/* {user === null ? 'NULL' : 'else'} */}
            {/* {JSON.stringify(currencies)} */}
            <Table
                columns={columns}
                dataSource={currencies}
            />
        </div>
    )
}
