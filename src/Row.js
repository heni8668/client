import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'



const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request?.data.results);
            return request

        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    // const handleClick = (movie) => {
    //     if (trailerUrl) {
    //         setTrailerUrl("");

            
    //     } else {
    //         movieTrailer(movie.title || movie.name || movie.original_name)
    //         .then((url) => {
    //             const urlParams = new URLSearchParams(new URL(url).search);
    //             setTrailerUrl(urlParams.get('v'));
    //         })
    //         .catch((error) => console.log(error));
    //     }
    // };

    const handleClick = (movie) => {
        if (trailerUrl) {
            // Trailer URL is already set, so clear it
            setTrailerUrl("");
        } else {
            // Try to fetch the trailer URL
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    // Check if the returned URL is valid
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get('v'));
                        // console.log(urlParams);
                    } else {
                        // Handle the case when the trailer URL is not available
                        console.log("Trailer URL not found");
                       
                    }
                   
                })
                .catch((error) => {
                    // Handle errors gracefully
                    console.log("Error fetching trailer:", error);
                    
                });

        }
    };
    


  return ( 
    <div className="row">
        
        <h1>{title}</h1>
        <div className="row__posters">
            {
                movies.map(movie =>  (
                    <img onClick={() => handleClick(movie)} key={movie.id} className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                     src={ `${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path} `}
                      alt={movie.name} />
                )  )
                
            }
        </div>

        <div className="" style={{ padding: '40px'}}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>

    </div>
  );
}

export default Row