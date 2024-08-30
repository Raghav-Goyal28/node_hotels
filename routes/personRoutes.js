const express=require("express");
const router=express.Router();
const Person = require("./../models/person");

//post route to add person
router.post('/',async(req,res)=>{
    try{
    const data=req.body //assume req body contain person data
    
    // creat New person document using mongoose model
    const newPerson=new Person(data);
    
    // save newperson to database
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
    }
    })

    
// database se data nikalana
router.get('/',async(req,res)=>{
    try{
    const data=await Person.find();
    console.log('data fetch');
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    })

     //parametrized api
     router.get('/:worktype',async(req,res)=>{
        try{
     const workType=req.params.worktype;
      if(workType == 'chef' || workType == 'waiter' || workType =='manager'){
        const response=await Person.find({work:workType});
        console.log('response fetch');
        res.status(200).json(fetch);
      }
        }
        catch{
            console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
        }
    })

    router.put('/:id',async(req,res)=>{
        try{
       const personId=req.params.id;//extract id from url browser
       const updatedpersondata=req.body;//
        const response = await Person.findByIdAndUpdate(personId,updatedpersondata,{
            new:true,//return update doc
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data update');
        res.status(200).json(response);
        }
        catch{
            console.error('Error fetching menu items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })

    router.delete('/person/:id', async (req, res) => {
        try {
        const personId = req.params.id; // Extract the person's ID
       // from the URL parameter
        // Assuming you have a Person model
        const deletedPerson = await Person.findByIdAndRemove(personId);
        if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
    }
    // Send a success message as a JSON response
    res.json({ message: 'Person deleted successfully' });
    } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    module.exports=router;