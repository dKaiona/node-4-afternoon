const express = require('express')
require('dotenv').config()
const session = require('express-session')
const middlewares = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')


const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(middlewares)
app.use(express.static(`${__dirname}/../build`))

//authController
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser)
//swag
app.get('/api/swag', swagController.getSwag)
//cartController
app.post('/api/cart', cartController.add)
app.delete('/api/cart', cartController.delete)
app.post('/api/cart/checkout', cartController.checkout)
//searchController
app.get('/api/search',searchController.search )




app.listen(SERVER_PORT, () => {
    console.log(`flying on port${SERVER_PORT}`)
})