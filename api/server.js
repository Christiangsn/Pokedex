const express = require('express');
const routes = require('./routes');
const TryCatch = require('./middlewares/GlobalExceptionHandler')


const app = express();

routes(app)
app.use(TryCatch)

app.listen(3001, () => console.log(`SERVER ON`))

module.exports = app