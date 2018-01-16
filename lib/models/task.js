'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    open: Boolean,
    date: Date,
    hasTime: Boolean,
    tags: Array,
    option: Number,
    priority: Boolean
},
{
    collection: 'Tasks'
})

module.exports = mongoose.model('Tasks', taskSchema);