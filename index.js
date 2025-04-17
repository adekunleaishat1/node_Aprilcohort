const express = require("express")
 const app = express()
const ejs = require("ejs")


app.set("view engine", "ejs")
app.use(express.urlencoded())


let todos = [];

let userarray = []
 app.get("/user",(request , response)=>{
    //  response.send("Welcome to Your Node Class")


    // response.send([
    //     {name:"Khadijah", food:"eba"},
    //     {name:"abubakr", food:"rice"},
    //     {name:"usman", food:"spagheti"},
    //     {name:"odun", food:"rice and beans"},
    //     {name:"muzamil", food:"goldenmorn"},
    //     {name:"ola", food:"cornflakes"},
    //     {name:"adekunle", food:"bolognese"},
    //     {name:"fathia", food:"garri"},
    //     {name:"dee", food:"pap"},
    //     {name:"adedayo", food:"seafood"},
    //     {name:"deborah", food:"coconutrice"},
    //     {name:"abraham", food:"fufu"},
    // ])

    // console.log(__dirname);
    
    
    response.sendFile(__dirname + "/index.html")


 })


 app.get("/",(req, res)=>{

    res.render("index",{name:"shola"})

 })

 app.get("/todo",(req, res)=>{

   res.render("addToDo",{todos})

})

 app.get("/login",(req,res)=>{
    res.render("login")
 })

 app.post("/signup",(req, res)=>{
   console.log(req.body);
   userarray.push(req.body)
   console.log(userarray);
    res.redirect("/login")
 })

 app.post("/user/login", (req, res)=>{
   console.log(req.body);
   const {email , password} = req.body
  const existuser = userarray.find((user)=> user.email === email)
  console.log(existuser);
  
  if (existuser && existuser.password == password) {
    console.log("login successful");
    res.redirect('/user')
  }else{
   console.log("User does not exist");
   res.redirect('/login')
  }
   
 })


 app.post("/addtodo",(req,res)=>{
   console.log(req.body);
   todos.push(req.body)
   console.log(todos);
   res.redirect("/todo")
 })


 app.post("/todo/delete",(req, res)=>{
   console.log(req.body.index);
   const index = req.body.index
   todos.splice(index, 1)
   res.redirect("/todo")
 })

 app.get("/todo/edit/:index",(req,res)=>{

    const index = req.params.index
    const onetodo = todos[index]
   //  console.log(todos[index]);
    res.render("edit",{index, onetodo})
 })

 app.post("/todo/update/:index",(req, res)=>{
  console.log(req.body);
  const index = req.params.index
  todos[index] = req.body
  res.redirect("/todo")
 })

const port = 7000
 app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
 })