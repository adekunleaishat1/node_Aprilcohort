const express = require("express")
 const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")


app.set("view engine", "ejs")
app.use(express.urlencoded())

// CRUD  CREATE READ UPDATE DELETE


const userschema = mongoose.Schema({
   username:{type:String,required:true,trim:true},
   email:{type:String, unique:true, required:true,trim:true},
   password:{type:String, required:true, trim:true},
},{timestamps:true})

const usermodel = mongoose.model("user_collection", userschema)

let todos = [];
let message;
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

    res.render("index",{name:"shola", message})

 })

 app.get("/todo",(req, res)=>{

   res.render("addToDo",{todos})

})

 app.get("/login",(req,res)=>{
    res.render("login",{message})
 })

 app.post("/signup", async(req, res)=>{
  try {
   console.log(req.body);
   const {username, email, password} = req.body
   if (!username || !email || !password) {
      message = "all fields are mandatory"
      console.log("all fields are mandatory");
      res.redirect("/")
   }else{
    const existuser =  await usermodel.findOne({email})
    console.log(existuser);
    if (!existuser) {
          const user = await usermodel.create(req.body)
      console.log(user);
      res.redirect("/login")
     }else{
         message = "user already exist, Please login!!!"
         res.redirect("/")
     }
    }
  } catch (error) {
    console.log(error);
    
  }
 })

 app.post("/user/login", async (req, res)=>{
  try {
   console.log(req.body);
   const {email , password} = req.body
   const validuser = await usermodel.findOne({email})
     console.log(validuser);
     if (validuser && validuser.password == password) {
      res.redirect("/todo")
     }else{
      message = "Invalid user"
      res.redirect("/login")
     }
     
  } catch (error) {
   console.log(error);
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




 const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/aprilcohort?retryWrites=true&w=majority&appName=Cluster0"

 const Connect = async () =>{
   try {
    const connection = await mongoose.connect(uri)
    if (connection) {
      console.log("database connected successfully");
      
    }
   } catch (error) {
      console.log(error);
      
   }
 }
Connect()

const port = 7000
 app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
 })

