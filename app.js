const express=require("express");
const app=express();
const path=require("path");

//to use patch and delete 
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
//uuid
const { v4: uuidv4 } = require('uuid');

//to use ejs of views folder
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//to parse form data 
app.use(express.urlencoded({extended:true}));

//to use static files like css 
app.use(express.static(path.join(__dirname,"public")));


app.listen(8080,()=>{
    console.log("listenning on port");
})

let posts=[{
    id:uuidv4(),
    username:"vishal Reddy",
    content:"I love coding"
}, {
    id:uuidv4(),
    username:"Rahul kumar",
    content:"I love riding"
},{
    id:uuidv4(),
    username:"Ram Reddy",
    content:"I love Singing"
},];


// /posts => to get  data for  posts(noun)
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//  /posts/new=> to add a new post

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
})

//to see in detail

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((e)=>id===e.id);
   res.render("show.ejs",{post});
});


//to update something
app.patch("/posts/:id" ,(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    //console.log(post);
    res.redirect("/posts");
  })
  app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
  })

//to delete post

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
});