 const express = require('express')
 const RecipeModel = require('../models/Recipe')

 const router = express.Router()


 //>>>>>>>>>>> create recipe route handling <<<<<<<<<<<<<<<

 router.post('/create-recipe',(req,res)=>{
    RecipeModel.create({
        name:req.body.name,
        ingredients: req.body.ingredients,
        instruction:req.body.instruction,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }).then(result => {
        return res.status(200).json(result);
    }).catch(error => console.log(error))
 })


 //>>>>>>>>>>> get all recipe <<<<<<<<<<<<<<<

 router.get('/recipes',(req,res)=>{
    RecipeModel.find().then(recipe=>{
        return res.json(recipe)
    }).catch(err => res.json(err))
 })


//>>>>>>>>>>> sinlgle recipe page handling <<<<<<<<<<<<<<<

 router.get('/read-recipe/:id',(req,res)=>{
    const id = req.params.id
    RecipeModel.findById(id)
    .then(result => {
        return res.json({result})
    }).catch(err=> console.log(err))
 })


//>>>>>>>>>>> My-Recipe page handling <<<<<<<<<<<<<<<

 router.get('/my-recipe/:id',(req,res)=>{
    const {id} = req.params
    RecipeModel.find({ "userId": id })
    .then((result)=>{
        console.log(result,'this is my recipe');
        return res.json(result)})
    .catch(err => console.log(err))
 })



//>>>>>>>>>>> Delete recipe Route handling <<<<<<<<<<<<<<<

 router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    RecipeModel.findByIdAndDelete(id)
        .then((result) => {
            res.json({ message: "Deleted Successfully", result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error deleting recipe" });
        });
});



 module.exports = router;