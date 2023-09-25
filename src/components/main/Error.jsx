import React from 'react';
import {useNavigate} from "react-router-dom";

const Error = (props) => {
    const navigate = useNavigate()
    return (
        <div style={{textAlign: "center"}}>
            <button onClick={() => navigate('/')}>Go to Main page</button>
            Error
        </div>
    );
};

export default Error;