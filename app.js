const express = require("express");
const connectToDb = require("./config/connectToDb")
const authRoute = require('./routes/authRoute')
const usersRoute = require('./routes/usersRoute')

require('dotenv').config()

//! Connection to DB
connectToDb()

//! init app
const app = express()

//! Middleware
app.use(express.json())

//! Routes 
app.use("/api/auth", authRoute)

app.use("/api/users/", usersRoute)

//! Running the server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${process.env.NODE_ENV} mode in port ${port} 🔥`);
});