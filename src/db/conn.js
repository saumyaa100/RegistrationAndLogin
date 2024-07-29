const mongoose=require ('mongoose');


// mongodb://localhost:27017/
mongoose.connect("mongodb://127.0.0.1:27017/registration",{
// mongoose.connect("mongodb://localhost:27017/registration",{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("Connection successful");
})
.catch((e)=>{
    console.log("No Connection");
    console.log(e);
});