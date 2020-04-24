const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
})
.then(() => {
    console.log('Connection established!!!');
})
.catch(e => console.log('Error',e));



