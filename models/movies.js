'use strict'

const request  = require('request');
const pg = require('pg-promise')({
// Initialization Options
});

const config = {
  host:       process.env.DB_HOST,
  port:       process.env.DB_PORT,
  database:   process.env.DB_NAME,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {
  searchMovies(req,res,next) {
    console.log('req.body = ', req.body);
    let title = req.body.title;
    let queryParams = { t: title, r: 'json' };
    let api_url = 'http://omdbapi.com'
 
    console.log("queryParams = ", queryParams);
    request({
        url: api_url, //URL to hit
        qs: queryParams, //Query string data
        method: 'GET', //Specify the method
        json: true
    }, function(error, response, data){
        if(error) {
          console.log(error);
          throw error;
        } else {
          console.log(response.statusCode, data);
          console.log("backend data = ", data);
          res.rows = data; 
          next();
        }
    });
  },

  getMovies(req,res,next) {
    _db.any("SELECT * from movies;")
      .then( movies=>{
        res.rows=movies;
        next();
      })
      .catch( error=>{
        console.error('Error ', error)
        throw error;
      })
  },

  addMovie(req,res,next) {
    _db.any(
      `INSERT Into 
      movies (title, poster)
      VALUES ($/title/, $/poster/)
      returning *;`, req.body
      )
    .then(movie=>{
      console.log();
      res.rows=movie;
      next();
    })
    .catch(error=>{
      console.error('ERROR in adding task', error)
      throw error;
    })
  },

  /* DELETE /movies/:id */
  deleteMovie(req,res,next) {
     const mID = Number.parseInt(req.params.mID);
     _db.none(`DELETE FROM movies
          WHERE movie_id = $1`, [mID])
       .then(() => {
        console.log('DELETE COMPLETED');
        res.rows = mID;
        next();
       })
        .catch( error => {
        console.log('Error ', error);
        throw error;
      });
  }

}