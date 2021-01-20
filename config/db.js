const mongoose = require('mongoose')
const config = require('config')
const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('MongoDB connected. ')
  } catch (err) {
    console.log(err.message)
    // exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
