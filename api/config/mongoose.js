const mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/MERN_Project'

mongoose.set('strictQuery', false)
mongoose.connect(URL)
const client = mongoose.connection;

client.on('error', () => { console.error('Error :: connection FALIURE to MongoDB') })
client.once('open', () => { console.log('Success :: connection setup with MongoDB') })

module.exports = client;