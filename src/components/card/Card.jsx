import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getContributors, getCurrentRepo} from "../actions/repos";

import "./card.less"

const Card = () => {
    const navigate = useNavigate()
    const {username, reponame} = useParams()

    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([ ])

    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    }, [])

    return (
        <div>
            <button onClick={() => navigate(-1)} className="back-btn">Back</button>
            <div className="card">
                <img src={repo.owner.avatar_url} alt=""/>
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazers_count}</div>
            </div>
        </div>
    );
};

export default Card;