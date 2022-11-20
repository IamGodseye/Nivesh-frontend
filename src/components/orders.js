import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Table } from 'antd';

export default function Orders() {
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState("");

    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        if (user === null) navigate('/')
        fetchOrders();
    }, [])
    let navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`${API}/get-orders`, { headers: { token: token } });

            if (!data.success) {
                // console.log(data.message)
                throw Error(data.message)
            }
            const { orders } = data

            setOrders(orders)
        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading(false);
            setOrders(null);
        }
    }

    const columns = [
        // price qty type status

        {
            title: 'Price',
            dataIndex: ['order', 'price'],
            key: 'order_price',
        },
        {
            title: 'Quantity',
            dataIndex: ['order', 'qty'],
            key: 'order_qty',
        },
        {
            title: 'Type',
            dataIndex: 'typeOf',
            key: 'typeOf',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]
    return (
        <div className="m-3" style={{ minHeight: '80vh' }}>
            {/* {user === null ? 'NULL' : 'else'} */}
            {/* {JSON.stringify(currencies)} */}
            <Table
                columns={columns}
                dataSource={orders}
            />

        </div>
    )
}
