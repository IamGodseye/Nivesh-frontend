import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

export default function KycForm() {
    const [pan, setPan] = useState("");
    const [dob, setDob] = useState("");
    const [loading, setLoading] = useState("");
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {

        if (user === null) navigate('/')
        fetchUser()
        if (user.kycVerified === true) navigate('/user')

    }, [])
    let navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const fetchUser = async () => {
        try {
            // const token = window.localStorage.getItem("token");
            console.log("FETCH USER =>>>");
            const { data } = await axios.get(`${API}/get-profile`,

                { headers: { token: token } },);
            console.log(data);
            if (data.success !== true) {
                throw Error("User data corrupted...plz Login again")
            }
        } catch (err) {
            console.log(err);
            // setOk(false);
            navigate("/login");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // return
            const { data } = await axios.post(`${API}/kyc`,
                {
                    panNumber: pan,
                    dateOfBirth: dob,
                },
                { headers: { token: token } });
            console.log("KYC responce", data);
            if (data.success === false) {
                throw Error(data.message)
            }
            toast.success(" KYC successful ");
            setLoading(false);
            setPan("");
            setDob("");
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
            <h1 className="text-center square mb-3 mt-3">Know your client</h1>
            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    className="form-control mb-4 p-4"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="Enter Pan number"
                    required
                />

                <input
                    type="date"
                    className="form-control mb-4 p-4"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Enter Date of Birth"
                    required
                />

                <button
                    type="submit"
                    className="btn btn-block btn-primary form-control width100 p-2 getting-started"
                    disabled={!pan || !dob || loading}
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
