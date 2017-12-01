let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let serveFavicon = require("serve-favicon");

let urlencodedParser = bodyParser.urlencoded({ extended: false })


let app = express();
app.use(express.static('public'));
app.use(serveFavicon(__dirname + "/public/images/favicon.ico"));
app.set("view engine", "pug");



mongoose.connect("mongodb://127.0.0.1:27017/test");
let db = mongoose.connection;

db.on("error", () => {
    console.log("mongodb connect error!");
})

db.once("open", () => {
    console.log("mongodb connect success!")
})

let personSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
})

let Person = mongoose.model("Person", personSchema);

let person = new Person({
    name: "allen",
    age: 23,
    gender: "male"
})
// Person.create(person, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }

// })


app.get("/user/:userName", (req, res) => {
    // res.end("hello world");
    res.status(200);
    res.set("Content-Type", "text/html");
    res.render("index", {
        userName: req.params.userName
    })
})

app.get("/", (req, res) => {
    Person.find({}, (err, persons) => {
        if (err) {
            return false
        }
        res.render("index", {
            persons: persons
        });
    })
})

// Add person
app.post("/user", urlencodedParser, function (req, res) {
    console.log(req.body);
    var newPerson = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    }
    Person.create(newPerson, (err, data) => {
        if (err) {
            return false;
        }

        res.send("success");
    })
})

app.listen(3000, () => {
    console.log("server running on port 3000");
})