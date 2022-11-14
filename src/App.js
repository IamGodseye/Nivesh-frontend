import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { UserContext, } from "./userContext";
import { useState, useMemo } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Navbar from "./components/navbar";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Index from "./pages";
import Profile from "./pages/profile";
import Kyc from "./pages/kyc";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <BrowserRouter>
      <UserContext.Provider value={providerUser}>

        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/kyc" element={<Kyc />} />

        </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;