const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Task = require("./models/task")

const app = express()
const PORT = 4000

// middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb+srv://Atharv-28:mongowithatharv@cluster0.qedujkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/",async (req, res) => {
    const data = await Task.find()
    res.status(200).json(data)
})

app.post("/add/task", (req,res) => {
    const task = req.body.task
    const description = req.body.description
    const hexcolor = req.body.hexcolor
    console.log(hexcolor+"in index")
    const addTask = new Task({
        task,
        description,
        hexcolor
    })   

    addTask.save().then(obj => {
        console.log(obj)
        res.status("200").send("The Data Was Added")
    }).catch(err => {
        console.log(err)
    })
})

app.delete("/delete/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => {
    console.log(`the server is running at port ${PORT}`);
})