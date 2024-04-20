/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
// import { getAll } from '../controllers/todos.controller'
import * as MovieController from '../controllers/movie.controller'
import { validate } from '../utils/validate'
import { createMovie,updateMovie } from '../validators/create-movie.validators'
import { authenticateToken } from '../middleware/authentication.middleware'
const route = express.Router()


route.get('/',  MovieController.getAll)
route.post('/', validate(createMovie), authenticateToken, MovieController.postMovies)
route.patch('/:id',validate(updateMovie),authenticateToken, MovieController.update)
route.delete('/:id',authenticateToken, MovieController.remove)
// route.get('/:id',MovieController.Get)
export default route;



