import express, { Application } from 'express'
import cors from 'cors'
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import router from './app/routes'
const app:Application = express()



// parser 
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'],credentials:true}))


// api
app.use("/api/v1",router)

app.get('/', (req, res) => {
    res.send('welcome to assignment project...')
})

app.use(notFound)
app.use(globalErrorHandler)


export default app ;