import React, { useState } from "react";
import Auth from "../components/Auth.jsx";

function Home() {
    const [showAuth, setShowAuth] = useState(false);

    return <div className="" >
        <button
            className="p-10  text-white px-4 py-4  bg-black"
            onClick={() => setShowAuth(true)} > open

        </button>
        {showAuth && <Auth onclose={() => setShowAuth(false)} />}

    </div>;
}

export default Home;
