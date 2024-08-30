const express=require("express");
const router=express.Router();
const MenuItem=require("./../models/MenuItem");

//
router.post('/', async (req, res) => {
    try {
    const data = req.body; // Assuming the request
   
    // Create a new menu item using the Mongoose model
    const menuItem = new MenuItem(data);
    // Save the new menu item to the database
    const response = await menuItem.save();
    console.log('Menu item saved');
    res.status(201).json(response);
    } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

// get
router.get('/', async (req, res) => {
    try {
    // Use the Mongoose model to find all menu items in the
   // database
    const data = await MenuItem.find();
    console.log('data fetch');
res.status(200).json(data);
    } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
// update
router.put('/:id', async (req, res)=>{
    try{
    const menuId = req.params.id; // Extract the id of Menu Item from the
   // URL parameter
    const updatedMenuData = req.body; // Updated data for the Menu Item
    const response = await MenuItem.findByIdAndUpdate(menuId,
    updatedMenuData, {
    new: true, // Return the updated document
    runValidators: true, // Run Mongoose validation
    })
    if (!response) {
    return res.status(404).json({ error: 'Menu Item not found' });
    }
    console.log('data updated');
    res.status(200).json(response);
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    }
    })
    //delete
    router.delete('/:id', async (req, res) => {
        try{
        const menuId = req.params.id; // Extract the Menu's ID from the URL
        parameter
        // Assuming you have a MenuItem model
        const response = await MenuItem.findByIdAndRemove(menuId);
        if (!response) {
        return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
        }catch(err){
       console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
        }
        })
        
    module.exports=router;