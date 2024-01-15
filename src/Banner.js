import React, { useEffect, useState } from 'react';
import './Banner.css'
import axios from './axios';
import requests from './requests';

function Banner() {
    const [banner, setBanner] = useState([])

    useEffect(() => {
      async  function fetchBannerMovie() {
            const request = await axios.get(requests?.fetchNetflixOriginals)
            setBanner(request?.data.results[
                Math.floor(Math.random() * request?.data.results.length)
            ]);
            return request
        }
        fetchBannerMovie();

    },[]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }


  return (
    <header 
    className='banner'
    style={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${banner?.backdrop_path}')`,
        backgroundPosition: 'center center'
    }}
    >
        <div className="banner__contents">
            <h1 className="banner__title">
                {banner?.name || banner?.title || banner?.original_name}
            </h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description">{truncate(banner?.overview, 150)}</h1>

        </div>
        <div className="banner_fadeBottom" />


    </header>
  )
}

export default Banner