require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();

const PORT = 3900
mongoose.set('strictQuery', true)
const taskRouter = require("./routes/taskRouter")
const notFound = require ("./middleware/notFoundRoute")
const errorHandler = require("./middleware/errorHandler")

//middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandler);

//error route
app.use(notFound)


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