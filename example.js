// First calls _getMovies() which in turn calls _callAPI()
// then, I loop through the response of _callAPI() to make another API call (_callVehicleAPI())

_callAPI() {
 return fetch('https://swapi.co/api/films/')
 .then(res => res.json())
 .then(res => res.results)
}

_callVehicleAPI(vehicles) {
 let cars = vehicles.map(car =>
   fetch(car)
     .then(res => res.json())
     .then(res => res.name)
   )

 return Promise.all(cars)// cars is an array of Promises
}


async _getMovies() {
 try {
   let movies = await this._callAPI()// movies is NOT a Promise here. HOW COME ????
   await movies.map(movie => {
     movie.carNames = this._callVehicleAPI(movie.vehicles)
     .then(res => {
       movie.carNames = res
     })
   })
   console.log('movies:',movies)
 }
 catch(err) {
   console.log('error in calling API', err)
 }
}

this._getMovies()
