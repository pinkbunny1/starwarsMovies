// FSC : Functional Stateless Components

import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';


function Movie(prop) {
    // Dumb component, only returns data(prop) recieved from a parent
    // poster is a prop in MoviePoster(prop) {} function
    // console.log('prop:', prop)
    return (

        <div className="MovieCard">
          <div className="MovieCard__Column">
            <MoviePoster className="MovieCard__Poster" url={prop.poster} title={prop.title} />
          </div>

          <div className="MovieCard__Column">
            <h2>{prop.title}</h2>
            <p>Episode: {prop.episode}</p>

          <div className="MovieCard__Details">
            <MovieDetail
                opening={prop.opening}
                rDate={prop.rDate}
                director={prop.director}
            />
          </div>
            <div className="MovieCard__cars">
              Vehicles: {prop.vehicles.map((carName, idx) => <Vehicle carName={carName} key={idx} /> )}
            </div>
          </div>
        </div>
    )
}

function Vehicle({carName}) {
  return (
    <span>{carName}, </span>
  )
}



function MoviePoster(prop) {
  return (
    <img className="MovieCard__Poster" src={prop.url} alt={prop.title} title={prop.title}/>
  )
}



function MovieDetail(anotherProp) {
    return (
      <div>
        <p className="MovieCard__sypnosis">{anotherProp.opening}</p>
        <h4 className="releaseDate">Release Date: {anotherProp.rDate}</h4>
        <h4 className="director">Director : {anotherProp.director}</h4>
      </div>
    )
}

// Checking Prop Types on the Function itself !
// What is prop in this function ? --> poster
// So check type of poster
Movie.propTypes = {
    opening: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

MovieDetail.propTypes = {
    opening : PropTypes.string.isRequired
}




export default Movie
