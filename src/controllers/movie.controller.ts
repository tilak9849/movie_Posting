/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction,Request,Response } from "express"
import * as movieService from '../services/movie.service'
import { number } from "zod"
import HttpStatus from 'http-status-codes';

export const getAll = async(req: Request,res: Response,next: NextFunction)=>{
    
    try {
      console.log((req as any).user)
      const data = await movieService
    .getAll()
      res.json(data)
  } catch (err) {
      next(err)
  
}
}

export const postMovies =async(req: Request, res:Response) =>{
    const Movie: any  = req.body
    console.log(req.body,'is request body')
    const movies =await movieService.postMovies(req.body,  (req as any).user.userId)
    res.status(HttpStatus.CREATED).send(movies)
}


export const update = async (req: Request, res: Response, next: NextFunction) => {
  try{
      const { id } = req.params
  const loggedInUserId = (req as any).user.userId;

  // @TODO: Handle errors
  const updates = await movieService
.update(Number(id), req.body, loggedInUserId)

  res.status(HttpStatus.CREATED).json(updates)
  } catch(e) {
      next(e)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try{
      const { id } = req.params
      // @TODO: Handle errors
      
      const removes = await movieService
    .remove(Number(id), (req as any).user.userId)
      res.status(HttpStatus.NO_CONTENT).json(removes)
  
  } catch(e)  {
      next(e)
  }
}

  
//   export const Get = async (req: Request,res: Response,next: NextFunction)=>{
    
//     const id = Number(req.params.id)
//     console.log(id)

//     try{

//     const quotes = await movieService.Get(id)
//     res.status(HttpStatus.OK).send(quotes)
//     }catch(err){
// next(err)
//     }

// }
  

