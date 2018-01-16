'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/task')

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/tasks-id&state', (req, res) => {

    Task.find({}, (err, tasks) => {

        if (err) {
            res.status(500).send(err);
        } else {
            let tasksList = tasks.map((task) => {
                return {
                    id: task["_id"],
                    open: task["open"]
                };
            });
            res.status(200).send(tasksList);
        }
    })

})


router.get('/tasks', (req, res) => {
    
        Task.find({}, (err, tasks) => {
            
            let tasksList = tasks.map(task => {
                return {
                    id: task["_id"],
                    title: task["title"],
                    open: task["open"],
                    priority: task["priority"],
                    option: task["option"] ? task["option"] : null,
                    date: task["date"] ? task["date"] : null
                };
            });

            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(tasksList);
            }
        })
    })


router.get('/tasks-id&state/:param-:value', (req, res) => {

    let param = req.params.param,
        value = req.params.value;

    Task.find({[param]: value}, (err, tasks) => {
        let tasksList = tasks.map(task => {
            return {
                id: task["_id"],
                open: task["open"]
            };
        });
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(tasksList);
        }
    })
})

router.get('/tasks-id&state/:year/:month/:day', (req, res) => {
    
        let year = parseInt(req.params.year),
            month = parseInt(req.params.month),
            day = parseInt(req.params.day);

        Task.find({"date": {$ne: null}}, (err, tasks) => {
            let tasksList = tasks.map(task => {
                let date = new Date(task["date"]);
                if( date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
                    return {
                        id: task["_id"],
                        open: task["open"]
                    };
                } else {
                    return null;
                }  
            }).filter((value) => { return value !== null});
            
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(tasksList);
            }
        })
    })

    router.get('/tasks-id&state/:year/:month', (req, res) => {
    
        let year = parseInt(req.params.year),
            month = parseInt(req.params.month);

        Task.find({"date": {$ne: null}}, (err, tasks) => {
            let tasksList = tasks.map(task => {
                let date = new Date(task["date"]);
                if( date.getFullYear() === year && date.getMonth() === month) {
                    return {
                        id: task["_id"],
                        open: task["open"]
                    };
                } else {
                    return null;
                }  
            }).filter((value) => { return value !== null});
            
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(tasksList);
            }
        })
    })

    
router.get('/tasks/:param-:value', (req, res) => {

    let param = req.params.param,
        value = req.params.value;

    Task.find({[param]: value}, (err, tasks) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(tasks);
        }
    })
})

router.get('/taskid-:taskid', (req, res) => {

    let taskid = req.params.taskid;

    Task.findOne({"_id": taskid}, {}, (err, task) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(task);
        }
    })

})

router.get('/taskid-:taskid/:param', (req, res) => {

    let taskid = req.params.taskid,
        param = req.params.param.split('&').join(" ");
    
        Task.findOne({"_id": taskid}, param, (err, task) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(task);
            }
        })
})


module.exports = router;