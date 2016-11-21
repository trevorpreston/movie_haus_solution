'use strict'

const movies = require('express').Router();
const db = require('../models/movies');

const sendJSONResp = (req,res)=>res.json(res.rows);

movies.route('/search')
  .post(db.searchMovies, sendJSONResp)

movies.route('/:mID')
//  .put((req,res)=>res.send(`Update Movie`))
//  .delete((req,res)=>res.send(`Delete Movie`))
 //.put(db.updateMovie, sendJSONResp)
 .delete(db.deleteMovie, (req,res)=>res.send(req.params.mID))

movies.route('/')
  //.get((req,res)=>res.send(`Get Movie List`))
 // .post((req,res)=>res.send(`Add Movie`))
 .get(db.getMovies, sendJSONResp)
 .post(db.addMovie, sendJSONResp)


module.exports = movies;