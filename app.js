require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();

const PORT = 3900
mongoose.set('strictQuery', true)
const taskRouter = require("./routes/taskRouter")

//middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", taskRouter);

//error
app.use((req, res) => {
    res.status(404).json({msg: '404 Not Found'});
})

//DBconnections

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, 'localhost', ()=>{
            console.log(`listening on port ${PORT}..`);
        });
    }catch(error)  {
        console.log(error);
    }
};

startServer ();