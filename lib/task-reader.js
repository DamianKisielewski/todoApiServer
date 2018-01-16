function getTasksIDs(tasks) {
    let tasksIDs = [];
    tasks.forEach((task) => {
        tasksIDs.push(task[_id])
    });
    return tasksIDs;    
}

module.exports ={
    getTasksIDs: getTasksIDs
} 