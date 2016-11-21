'use strict'

// import the libs we need
import React            from 'react';
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import MovieForm        from './MovieForm.jsx'
import MovieList        from './MovieList.jsx'
import NewMovie         from './NewMovie.jsx'
import Footer           from './Footer.jsx'

import ajax             from '../helpers/ajaxAdapter.js'
import util             from '../helpers/util.js'

// create a React Component called _App_
export default class App extends React.Component{

    // every class gets a constructor.
    // this is where we init the state.
    constructor() {

        // we also need to wake up our ancestors
        super();

        // here's our state
        this.state = {
          movies : {},
          currentMovie : {},
          hasCurrentMovie : false,
          movieNotFound : false
        }
    }

    setMovieNotFound(val) {
        this.setState({movieNotFound: val})
    }

    loadCurrentMovies() {
        // go to the db and get the freshest movies
        ajax.getMovies().then( data=>
            // when the data comes back, update the state
            this.setState({movies: data.indexByKey('movie_id') })
        )

    }

    setCurrentMovie( movie ){
        this.setState({currentMovie: movie, hasCurrentMovie: true})
    }

    deleteCurrentMovie() {
        this.setState({currentMovie: {}, hasCurrentMovie: false})
    }

    saveCurrentMovie() {
        if (this.state.currentMovie) {
            ajax.createMovie(this.state.currentMovie).then( data=> {
                this.setState({currentMovie: {}, hasCurrentMovie: false})
                this.loadCurrentMovies();
            })
        }
    }

    deleteMovie(id){
        ajax.deleteMovie(id)
          .then( movie_id=>{
            delete this.state.movies[ movie_id ];
            this.setState({movies: this.state.movies})
          })
    }


    // this is right after the component is mounted on the screen.
    componentDidMount(){
        this.loadCurrentMovies();
    }

    // note that classes do **not** have commas between their methods

    // 90% of your components will render()
    // REMEMBER you can only return **one** root element from a render fn.
    render(){
        return(
            <container>
            <header>
              <Nav />
            </header>
            <div className="container">
              <MovieForm setCurrentMovie={this.setCurrentMovie.bind(this)}
                         saveCurrentMovie={this.saveCurrentMovie.bind(this)}
                         deleteCurrentMovie={this.deleteCurrentMovie.bind(this)}
                         setMovieNotFound={this.setMovieNotFound.bind(this)} />
              <section className="row">

                {/* list of movies playing */}
                <article className="col-md-6 text-center" >
                  <h3>Current Movies</h3>
                  <MovieList
                    list={this.state.movies}
                    deleteMovie={this.deleteMovie.bind(this)}
                  />
                </article>

                {/* Movie from search result */}
                <article className="col-md-6 text-center">
                  <h3>Movie Result</h3>
                  <NewMovie 
                    movie={this.state.currentMovie} 
                    hasCurrentMovie={this.state.hasCurrentMovie}
                    movieNotFound={this.state.movieNotFound}
                  />
                </article>

              </section>
            </div>
            <Footer />
            </container>
        )
    }
}

// mount our App at #container
ReactDOM.render(<App />, document.querySelector('#container'))