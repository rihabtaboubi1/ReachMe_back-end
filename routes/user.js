const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer'); 

filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file , redirect)=>{
        let date = Date.now();

        let fl = date + '.' + file.mimetype.split('/')[1]; 
        redirect(null , fl);
        filename = fl;
    }
})
const upload = multer({storage: mystorage});
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, lastname, email, telephone_number, notes  } = req.body;
        let imagePath = null;
        if (req.file) {
            imagePath = req.file.path; 
        }
        const usr = new User({
            name: name,
            lastname: lastname,
            email: email,
            image: imagePath, 
            telephone_number: telephone_number , 
            notes: notes
        });
        const savedUser = await usr.save();
        res.send(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});




router.get('/all' ,async (req, res)=>{
    try{
        users = await User.find();
        res.send(users);
    } catch (error){
        res.send(error)
    }
})




router.put('/upt/:id' , async (req, res)=>{
  
    try {
        id = req.params.id;

        newData = req.body;

        updated = await User.findByIdAndUpdate({_id: id} , newData);

        res.send(updated);

    } catch (error){
        res.send(error)
    }
})




router.delete('/del/:id' , async (req,res)=>{
    try {
        id = req.params.id
        deleteUser = await User.findByIdAndDelete({_id: id});
        res.send(deleteUser)

    } catch (error){
        res.send(error)
    }
})



























module.exports = router;