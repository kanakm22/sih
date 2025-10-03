const express = require("express");
const app = express();
const path = require("path");
// const port = 3000;
const collection = require("./mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signUp.ejs");
});

app.post("/signup",async(req,res)=>{
    const data = {
        fullName : req.body.fullname,
        username:req.body.username,
        password: req.body.password,
        email:req.body.email,
        mobile:req.body.mobile
    }

    try{
        const existingUser = await collection.findOne({username: data.username});
        if (existingUser){
            res.send('<script>alert("User already exists. Please choose a different name."); window.location.href = "/signup";</script>')
        }else{
            await collection.insertMany([data]);
            res.redirect("/login")
        }
    }catch(err){
        res.send('<script>alert("An error occurred during signup."); window.location.href = "/signup";</script>')
        console.error("error during signup",err);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const check = await collection.findOne({username:req.body.username})
        if(check.password === req.body.password){
            res.render("index.ejs");
        }else{
            res.send('<script>alert("Wrong username or password."); window.location.href = "/login";</script>')
        }
    }catch{
        res.send('<script>alert("Wrong username or password."); window.location.href = "/login";</script>')
    }
})

app.get("/catalog", (req, res) => {
  res.render("catalog.ejs");
});

app.get("/project", (req, res) => {
  res.render("project.ejs");
});

app.get("/graph1", (req, res) => {
  res.render("graph1.ejs");
});

app.get("/graph2", (req, res) => {
  res.render("graph2.ejs");
});

app.get("/graph3", (req, res) => {
  res.render("graph3.ejs");
});

app.get("/graph4", (req, res) => {
  res.render("graph4.ejs");
});

// ❌ No app.listen() for Vercel

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

//module.exports = (req, res) => {
//  res.status(200).send("Hello from your Serverless Function!");
//};

module.exports = app;
