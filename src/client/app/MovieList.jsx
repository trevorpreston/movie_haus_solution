import React from 'react';

export default function MovieList(props){

  return(
    <div className="list-group text-center">
    {Object.keys(props.list)
      .map(key=>(
        <section className="list-group-item" key={key}>
            <h3>{props.list[key].title}</h3> <br />
            <img className="movie-img" src={props.list[key].poster} /> <br />
            <button className="btn btn-danger btn-lg" onClick={event=>props.deleteMovie(key)}>Delete</button>
        </section>
      ))
    }
    </div>
  )

}