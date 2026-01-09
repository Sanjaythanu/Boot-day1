// import express in the file
const express= require("express");
// import the file system module
const fs=require("fs");
// import cors
const cors = require("cors");

// create app as express and port for server
const app =express();
const PORT =5000;

// MIDDLEWARE

app.use(cors());
app.use(express.json());

// Read the data from json file

const readData =()=>{
    const data =fs.readFileSync("data.json");
    return JSON.parse(data);
}

// Write the data to JSON file

const writeData =()=>{
    fs.writeFileSync("data.json",JSON.stringify(data));
};
app.get("/posts",(req,res)=>{
    const data=readData();
    res.json(data.posts);
});
app.post("/post",(req,res)=>{
    const data=readData();
    const newPost={
        id:Date.now(),
        title:req.title,
        body:req.body.body
    };
    data.posts.push(newPost);
    // SAve the updated data to data.json
    writeData(data);
    // Send the newly created post as response to frontend
    res.json(newPost);
});

// Put method - update the post 

app.put("/posts/:id",(req,res)=>{
    // Read the old data
    const data=readData();

    // Get the post id form the url and convert that to no
    const postId=Number(req.params.id);
    // UPdate the matching post
    data.posts=data.posts.map(p=>
        p.id===postId ?{...p ,...req.body}:p
    );
    // save the updated to json
    writeData(data);
    res.json({message:"Post Updated"});
});

// delete method - delete the post

app.delete("/posts/:id",(req,res)=>{
    // Read the old data
    const data=readData();

    // Get the post id form the url and convert that to no
    const postId=Number(req.params.id);

    // Remove the post which matches the id
    data.posts=data.posts.filter(p=>p.id !==postId);

    // Save the updated data back to json
    writeData(data);
    res.json({message:"Post Deleted"});
}
);

app.listen(PORT,()=>{
    console.log(`Server is running in http://localhost`)
})