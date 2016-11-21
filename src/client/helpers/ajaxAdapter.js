'use strict'
const ajaxAdapter = {

  searchMovies(data){
    console.log('frontend data = ', data )
    return fetch(`/movies/search`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
    .then( r=> r.json() )
  },

  getMovies(){
    return fetch('/movies')
      .then( r=> r.json() )
  },

  createMovie(newMovie){
    return fetch('/movies',{
      method:'post',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newMovie)
    })
    .then( r=> r.json() )
  },

  deleteMovie(id){
    return fetch(`/movies/${id}`,{
      method:'DELETE',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then( r=> r.json() )
  },

}
export default ajaxAdapter