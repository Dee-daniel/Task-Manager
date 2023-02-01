const Tasks = require ("../model/tasks");

//get all the tasks
const getAllTasks = async (req,res) => {
    // res.send('get all tasks');
    try {
        const tasks = await Tasks.find();
        res.status(200).json({numOftasks: tasks.length, tasks});

    } catch (error) {
        res.status(500).json ({msg: "An error occurred"});
    }
};

//get a single task
const getTAsk = async (req,res) => {
    // res.send('get task');
    const {taskId} = req.params;
    try {
        const task = await Tasks.findOne({_id: taskId });
        if (!task){
            return res.status(404).json ({msg: `Task with the id : ${taskId} not found`})
        }
        res.status (200).json({task})
    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: "An error occurred"});
    }
}

//create task
const createTAsk = async (req,res) => {
    // res.send('create task');
    try {
        const {title, priority} = req.body
        if (!title || !priority) {
            return res.status(400).json ({msg:"Please provide necessary information"})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg:"Task created", task});
    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: "An error occurred"});
    }
}

//update
const updateTAsk = async (req,res) => {
    // res.send('update task');
    try {
        const {taskId} = req.params;
        const Task = await Tasks.findByIdAndUpdate({_id: taskId}, 
        req.body, {new: true, runValidators: true,
        })
        res.status (200).json({msg: "tasks updated successfully", Task});

    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: "An error occurred"});
    }
}

//delete
const deleteTAsk = async (req,res) => {
    // res.send('delete task');
    try {
        const {taskId} = req.params
        const task = await Tasks.findByIdAndDelete ({_id: taskId});
        res.status(200).json({msg:"Task Deleted", task});
        
       
    } catch (error) {
        console.log(error);
        res.status(500).json ({msg: "An error occurred"});
    }
}


//exports
module.exports = {
  getAllTasks, updateTAsk,deleteTAsk, getTAsk, createTAsk
}