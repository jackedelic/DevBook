const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
const path = require('path') // required in production environment

dotenv.config()

// Connect database
connectDB()

const PORT = process.env.PORT || 5000

app.use(express.json({ extended: false }))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}. `)
})

module.exports = server
