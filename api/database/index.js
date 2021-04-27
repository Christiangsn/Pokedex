const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://CRTDBZNG222:CRTDBZNG222@cluster0.ozqwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB ON')
})
mongoose.Promise = global.Promise;

module.exports = mongoose;