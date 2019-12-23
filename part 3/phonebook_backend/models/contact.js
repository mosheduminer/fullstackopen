const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const contactSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  number: {type: String, minlength: 8}
})
contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('contact', contactSchema)
