import React from 'react';

export default function MovieList(props){
  if (props.hasCurrentMovie) {
    return(
      <div className="list-group text-center">
          <section className="list-group-item">
            <h3>{props.movie.title}</h3><br />
            <img src={props.movie.poster} />
          </section>
      </div>
    )
  } else if (props.movieNotFound) {
    return(
      <h2>Sorry! Movie not found.</h2>
    )
  } else {
    return(
      <h2>Enter a movie title in the search bar</h2>
    )
  }

}