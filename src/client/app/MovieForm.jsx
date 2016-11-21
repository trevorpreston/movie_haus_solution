'use strict'

import React from 'react';
import ajax  from '../helpers/ajaxAdapter.js'

export default function MovieForm(props) {

  const handleSubmit = event=>{
    event.preventDefault();

    //Call back to the server to get a movie by title
    //If we get a movie save it to the currentMovie
    const title = event.target.elements.title.value;
    let params = {title: title};
    console.log('About to call ajax searchMovies with param: ', params)

    //If there is a movie from previous search, remove it
    props.deleteCurrentMovie();

    ajax.searchMovies(params).then( data=>{
      console.log("In handlesubmint.SearchMovies. Got data: ", data);
      if (data && data.Title && data.Poster) {
        let currentMovie = { title: data.Title, poster: data.Poster }
        console.log('currentMovie = ', currentMovie);
        props.setCurrentMovie(currentMovie);
        props.setMovieNotFound(false);
      }
      else {
        props.setMovieNotFound(true);
      }
    })

    // clear form
    event.target.reset();
  }

  return (
    <section className="jumbotron">
    <h2>Search for movie</h2>
    <div className="row">
      <div className="col-sm-8">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="title"> Movie Title</label>
            <input type="text" className="form-control input-lg" name="title" placeholder="Title" />
          </div>
           
          <button type="Submit" className="btn btn-primary btn-lg">Search</button>

        </form>
      </div>
      <div className="col-sm-4">
        <button className="btn btn-primary btn-lg" onClick={props.saveCurrentMovie}> Save Movie </button>
      </div>
    </div>
  </section>
  )

}