import express from "express"
import movieRouter from './routes/movie.routes'
import userRouter from './routes/user.route'
import { genericErrorHandler } from "./middleware/error-middleware";
import cors from "cors";
const PORT = 2222;
const app = express() 
app.use(express.json())
app.use(cors())
app.use('/movies', movieRouter)
app.use('/users', userRouter)

app.listen(PORT, ()=>{
    console.log('Runnig on port',PORT)
});
app.use(genericErrorHandler)

export default app;