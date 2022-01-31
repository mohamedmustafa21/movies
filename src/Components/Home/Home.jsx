import axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

export default function Home(props) {



  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);




  let imgPrefix = "https://image.tmdb.org/t/p/w500";
  console.log(props);

  async function getTrindingMedia(mediaType , callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=274ebeebade49709e8b59808c78353a9`
    );
    callback (data.results.slice(0, 10));
  }

  useEffect(() => {
    getTrindingMedia('movie' , setTrendingMovies);
    getTrindingMedia('tv', setTrendingTv );
    getTrindingMedia('person', setTrendingPeople );
  }, []);

  return (


    <>


<div className="row">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr my-3 w-25"></div>
        <h2 className="h4">
          Trending Movies <br />
          To Watch <br /> Right Now{" "}
        </h2>

        <p className="text-muted">Trending Movie To Watch </p>
        <div className="brdr my-3 w-75"></div>
      </div>
        </div>
       

      {trendingMovies.map((movie, index) => (
        <div key={index} className="col-md-2">
          <div className="movie">
            <img
              className="imgs w-100"
              src={imgPrefix + movie.poster_path}
              alt={movie.title}
            />
            <h3 className="text-center h6 my-2">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>



    <div className="row my-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr my-3 w-25 "></div>
        <h2 className="h4">
          Trending Tv <br />
          To Watch <br /> Right Now
        </h2>

        <p className="text-muted">Trending Tv To Watch </p>
        <div className="brdr my-3 w-100"></div>
      </div>
        </div>
       

      {trendingTv.map((movie, index) => (
        <div key={index} className="col-md-2">
          <div className="movie">
            <img
              className="imgs w-100"
              src={imgPrefix + movie.poster_path}
              alt={movie.name}
            />
            <h3 className="text-center h6 my-2">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>

    <div className="row ">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr my-3 w-25"></div>
        <h2 className="h4">
          Trending People <br />
          To Watch <br /> Right Now{" "}
        </h2>

        <p className="text-muted">Trending Movie To Watch </p>
        <div className="brdr my-3 w-75"></div>
      </div>
        </div>
       

      {trendingPeople.map((movie, index) => (
        <div key={index} className="col-md-2">
          <div className="movie">
            <img
              className=" imgs w-100 py-2"
              src={imgPrefix + movie.profile_path}
              alt={movie.name}
            />
            <h3 className="text-center h6 my-2">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>

    </>
   
    




    




  );
}
