const express = require('express');
const routes = require('./routes');
const TryCatch = require('./middlewares/GlobalExceptionHandler')
const path = require('path');

const app = express();

routes(app)
app.use(TryCatch)
app.use(express.static(path.join(__dirname, "..", "public" )));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    return res.render("html/pokedex.html")
})

app.listen(3001, () => console.log(`SERVER ON`))

module.exports = app