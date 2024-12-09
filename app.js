import cookieParser from "cookie-parser"
import cors from 'cors'
import express, { urlencoded } from "express"
const app=express()

app.use(cors({origin:process.env.CORS_ORIGIN}))
app.use(cookieParser)
app.use(urlencoded({extended:true}))
app.use(express.json())


export default app