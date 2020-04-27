const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_CON,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
})
.then(() => {
    console.log('Connection established!!!');
})
.catch(e => console.log('Error',e));



