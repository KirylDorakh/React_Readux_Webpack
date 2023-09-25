import React, {useEffect, useState} from 'react';

import './main.less'
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../actions/repos";
import Repo from "./repo/Repo";
import {setCurrentPage} from "../../reducers/reposReducer";
import {pagesCreator} from "../../utils/pagesCreator";
import {Route, useNavigate} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const perPage = useSelector(state => state.repos.perPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const ifFetchError = useSelector(state => state.repos.isFetchError)

    const[searchValue, setSearchValue] = useState("")

    const pagesCount = Math.ceil(totalCount/perPage )
    const pages = []

    pagesCreator(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue,currentPage, perPage))
    }, [currentPage])

    const searchHandler = () => {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue))
    }

    // const navigate = useNavigate()
    //
    // if (ifFetchError) {
    //     navigate("/error")
    // }

    return (
        <div>
            { ifFetchError
                ?
                <div className="alert alert-danger" role="alert">
                    Error! Please reload the page!
                </div>
                : ""
            }
            <div className="search">
                <input value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       type="text"
                       placeholder="input repo name"
                       className="search-input"/>
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            {
                isFetching
                    ?
                    <div className="fetching">

                    </div>
                    :
                    repos.map(repo =>
                        <Repo repo={repo}/>
                    )
            }
            <div className="pages">
                {
                    pages.map((page, index) =>
                        <span
                            className={currentPage == page ? "current-page" : "page"}
                            onClick={() => {dispatch(setCurrentPage(page))}}
                            key={index}>
                            {page}
                        </span>
                    )
                }
            </div>

        </div>
    );
};

export default Main;