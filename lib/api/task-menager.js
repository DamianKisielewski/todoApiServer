'use strict';
//Loading Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/task')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const save = (task, res) => {
    task.save((err, task) => {
        if (err) {
            res.status(500).send(err);
        } else if(task){
            res.status(200).send(task);
        }
    })
};

router.post('/addtask', (req, res) => {

    Task(req.body).save((err, task) => {
        if (err) {
            res.status(500).send(err);
        } else if (task){
            res.status(200).send(task);
        }
    })
})


router.post('/edit/:taskId/:param-:newValue', (req, res) => {

    let taskId = req.params.taskId,
        param = req.params.param,
        newValue = req.params.newValue;

    Task.findOne({"_id": taskId}, {}, (err, task) => {

        if (err) {
            res.status(500).send(err);
        } else if (task && param === "date" && newValue==="null") {
            task["date"] = undefined;
            save(task, res);
        } else if (task) {
            task[param] = newValue;       
            save(task, res);
        }
    })
})


router.post('/remove/taskid-:taskid', (req, res) => {

    let taskid = req.params.taskid;
    console.log(taskid)
    Task.findByIdAndRemove(taskid, (err, task) => {
        if(err) {
            res.status(500).send(err);
        } else if (task) {
            res.status(200).send("Task has been removed");
        }
    })
})

module.exports = router;