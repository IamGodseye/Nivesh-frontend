import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext'
import { SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        if (user !== null) navigate('/user')
    }, [])
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`${API}/signup`, {
                email,
                password,
            });
            console.log("Register responce", data);
            if (!data.success) {
                // console.log(data.message)
                throw Error(data.message)
            }
            toast.success(" Registeration Successful... Please Login");
            setLoading(false);
            setEmail("");
            setPassword("");

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
            <h1 className="text-center square mb-3 mt-3">Signup</h1>
            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    className="form-control mb-4 p-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                />

                <input
                    type="password"
                    className="form-control mb-4 p-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />

                <button
                    type="submit"
                    className="btn btn-block btn-primary form-control width100 p-2 getting-started"
                    disabled={!email || !password || loading}
                    style={{
                        backgroundColor: "#0066FF",
                        borderColor: "#2E47FF",
                        color: "white",
                    }}
                >
                    {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
            </form>
            <p
                className="text-center p-3"
                style={{
                    fontWeight: "550",
                }}
            >
                Already registerd?{" "}
                <button onClick={() => navigate("/login")} className="m-2 btn btn-primary" style={{ textDecoration: 'none', fontWeight: '700' }}>
                    <span>Login</span>
                </button>
            </p>

        </div>
    )
}
