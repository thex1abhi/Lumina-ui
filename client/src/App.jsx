import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import axios from "axios";


export const ServerUrl = "http://localhost:8000"
function App() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App;
