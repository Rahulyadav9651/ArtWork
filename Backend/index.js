import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import "dotenv/config";

import database from "./config/database.js"


const port= process.env.PORT || 3000;

const app= express();

app.use(express.json())


app.get('/',(req, res)=>{
    res.status(200).send("server is live");
})

//DB connect
database.DbConnect();



//start server
app.listen(port,()=>{
    console.log(`App is listening At PORT ${port}`)
})