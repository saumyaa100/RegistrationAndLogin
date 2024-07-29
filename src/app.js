const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
require('./db/conn');
const Register=require('./models/register');

const port=process.env.PORT || 3000

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// console.log(path.join(__dirname,"../public"));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);




app.get("/",(req,res)=>{
//    res.send("Hello from backend fied");
   res.render("index");
});

app.get("/register", (req,res)=>{
    res.render("register")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/register", async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            // console.log(req.body.firstname);
            // console.log(req.body.lastname);
            // console.log(req.body.email);
            // console.log(req.body.password);
            // console.log(req.body.confirmpassword);
            const registerEmployee=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword,

            })
            const registered=await registerEmployee.save();
            res.status(201).render("index");
    }
    else{
        res.send("Passwords are not matching");
        // console.log(password);
        // console.log(cpassword);
        // alert("Passwords are not matching");
    }
}
    catch(error){
        res.status(400).send(error);
    }
})

app.post("/login", async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await Register.findOne({email:email});
        if(useremail.password===password){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid Login Details");
        }
    }
    catch(error){
        res.status(400).send("Invalid Login Details");
    }
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})