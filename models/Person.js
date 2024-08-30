const mongoose=require('mongoose')

// define person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    age:{
        type:Number

    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required :true
    },
    email:{
        type:String,
        required:true,
        unique:true   
    }
});

// create Person model
const Person=mongoose.model('Person',personSchema);

module.exports=Person;