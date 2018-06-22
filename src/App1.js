import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './App.css';
import Movie from './Movie';





class App extends Component {
  // PropType checking for Components
  // static proptypes = {
  //   title : PropTypes.number,
  //   url : PropTypes.string
  // }

  state = {
    movies : [],
    test: []
  }

  _loadStateMovies() {
    let { movies } = this.state
    console.log('movies[0]', movies[0])
    console.log('movies[0].title', movies[0].title)
    console.log('movies[0].carNames', movies[0].carNames)
    const movieComponents = movies.map(movie => {
      return <Movie
                key={movie.episode_id}
                title={movie.title}
                opening={movie.opening_crawl}
                rDate={movie.release_date}
                director={movie.director}
                vehicles={movie.carNames}
             />
    })
    return movieComponents
  }

   _callAPI() {
    return fetch('https://swapi.co/api/films/')
    .then(res => res.json(), console.log("api returned"))
    .then(res => res.results)
  }

  _callVehicleAPI(vehicles) {

    return Promise.all(
      vehicles.map(
        car => fetch(car)
          .then(res => res.json())
          .then(res => res.name)
        ))
  }


  async _getMovies() {
    try {
      let movies = await this._callAPI()

      // await movies.map(async movie => {
      //   movie.carNames = await this._callVehicleAPI(movie.vehicles)
      //   // .then(res => res)
      //   // .then(res => { movie.carNames =  res })
      //   return movie
      // })
      const moviesWithVehicles = await Promise.all(
        movies.map(async movie => {
          movie.carNames = await this._callVehicleAPI(movie.vehicles)
          return movie
        })
      )
      console.log('moveis:', movies)
      // console.log('a:', a)
      this.setState({movies})
      // this.setState({test: a})
    }
    catch(err) {
      console.log('error in calling API', err)
    }
  }



  componentDidMount() {
    console.log("this is Did Mount method", this.state.movies)
    // API call to get all Star Wars Films
    this._getMovies()
  }



  render() {
    let { movies } = this.state
    // console.log('movies at render:', movies)
    return (
      <div>
        { movies.length ? this._loadStateMovies() : "Loading..." }
      </div>
    );
  }


}

export default App;
