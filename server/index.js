const express =require ("express");
const users=require("./sample.json");
const cors=require("cors");
const fs=require("fs");

const app=express();
app.use(express.json());
const port=8000;

app.use(cors
     ({
        origin:"http://localhost:5173",
        methods:["GET","POST","PATCH","DELETE"],

    })
)



app.get("/users",(req,res)=>{
    return res.json(users);

});

app.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let filteredusers=users.filter((user)=>(user.id!==id))
    fs.writeFile("./sample.json",JSON.stringify(filteredusers),(err,data)=>{
        return res.json(filteredusers);
    })

})

app.patch("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let {name,age,city}=req.body;
        if(!name || !age || !city){
        res.status(404).send({message:"All fields required"})

    }
      let index=users.findIndex(user=>user.id===id)
      users.splice(index,1,{...req.body})
    
    
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"Data updated successful"})
    })

   

})

app.post("/users",(req,res)=>{
    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(404).send({message:"All fields required"})

    }
    let id=Date.now();
    users.push({id,name,age,city})
    
    
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"Data added successful"})
    })

   

})



app.listen(port,(err)=>{
    console.log(`app is running in port ${port}`);
});