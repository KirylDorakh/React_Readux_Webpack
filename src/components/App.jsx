import React from 'react';
import './app.less'
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "../reducers/reposReducer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/Card";
import Error from "./main/Error";

const App = () => {
    const dispatch = useDispatch()


    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/card/:username/:reponame" element={<Card />} />

                    <Route path="/error" element={<Error />} />
                    <Route path="/*" element={<Navigate to="/"/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;