import express from "express";

const app = express();

const PORT = 3000;

const users = [
    {id : 1 , name : "PALVANNAN"},
    {id : 2 , name : "Arun"},
    {id : 3 , name : "Arjun"},
    {id : 4 , name : "Preeti"},
    {id : 5 , name : "Priya"}
]

app.get('/',(req,res)=> {
    res.send({name : "Home Page"})
})

app.get("/api/users" , (req,res)=> {
    const {query:{filter , value}}= req;
    console.log(filter,value);
    if(filter && value){
        return res.send(users.filter((user)=>user[filter].toLowerCase().includes(value)))
    }
    res.send(users);
})

app.get('/api/users/:id' , (req,res) => {
    //res.send(users);
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res.status(400).send("Invlid ID format")
    }
    const user = users.find((user)=>user.id === id);
    if(user){
        return res.send(user);
    }
    return res.status(400).send("User Not Found");
})

app.use(express.json());

app.post("/api/users",(req,res)=>{
    console.log(req.body);
    const {body} = req;
    const newUser = {id: users[users.length-1].id+1, ...body};
    users.push(newUser);
    return res.status(201).send(newUser);
})

app.put('/api/users/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res.status(400).send("Invlid ID format")
    }
    const userid = users.findIndex((user)=>user.id === id);
    if(userid === -1){
        return res.status(400).send("User Not Found");
    }
    const {body} = req;
    users[userid] = {id: id, ...body};
    return res.status(201).send({msg: "User updated"})
})


app.patch('/api/users/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res.status(400).send("Invlid ID format")
    }
    const userid = users.findIndex((user)=>user.id === id);
    if(userid === -1){
        return res.status(400).send("User Not Found");
    }
    const {body} = req;
    users[userid] = {...users[userid],...body};
    return res.sendStatus(200);
})

app.delete('/api/users/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res.status(400).send("Invlid ID format")
    }
    const userid = users.findIndex((user)=>user.id === id);
    if(userid === -1){
        return res.status(400).send("User Not Found");
    }
    users.splice(userid , 1);
    return res.sendStatus(200);
})

app.listen(PORT , ()=>{
    console.log(`App is running on PORT ${PORT}`);
})