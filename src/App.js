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
    posters :
      {
        4 : "https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-movie/star-wars-episode-iv-new-hope.jpg?itok=m1hZWQ2G",
        5 : "https://images-na.ssl-images-amazon.com/images/I/51xLMXeYOoL.jpg",
        6 : "http://www.reelviews.net/resources/img/posters/thumbs/sw6_poster.jpg",
        1 : "https://i.pinimg.com/originals/33/13/25/331325b7c2cfac9d5e542cdc0c54b0fb.jpg",
        2 : "https://www.halon.com/wp-content/uploads/2010/07/starwarsepisode_ii_012.jpg",
        3 : "https://imgc.allpostersimages.com/img/print/affiches/star-wars-episode-3_a-G-6132960-0.jpg",
        7:"https://images-na.ssl-images-amazon.com/images/I/71rZtELyYzL._SY679_.jpg"
      }

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
                episode={movie.episode_id}
                poster={movie.poster}
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

  _sortByDate(movies) {
    return movies.sort((a,b) =>{
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
    return new Date(a.release_date) - new Date(b.release_date);
    })
  }

  _addPosters(movies) {
    const { posters } = this.state
    return movies.map(movie => {
      movie.poster = posters[movie.episode_id]
      return movie
    })
  }


  async _getMovies() {
    try {
      let movies = await this._callAPI()

      let moviesWithVehicles = await Promise.all(
        movies.map(async movie => {
          movie.carNames = await this._callVehicleAPI(movie.vehicles)
          return movie
        })
      )

      const sortedMovies = await this._sortByDate(moviesWithVehicles)

      const result = await this._addPosters(sortedMovies)
      console.log('a:', result)
      this.setState({movies:result})
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
      <div className={movies.length ? "App" : "loading"}>
        { movies.length ? this._loadStateMovies() : "Loading..." }
      </div>
    );
  }


}

export default App;
