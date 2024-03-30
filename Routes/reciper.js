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



//>>>>>>>>>>> get Edit recipe Route handling <<<<<<<<<<<<<<<

router.get('/edit-recipe/:id',(req,res)=>{
    const {id} = req.params
    console.log("haii edit bknd");
    RecipeModel.findById(id)
    .then((result) => {
        console.log(result,"recipe to edit")
        res.json(result)
    }).catch(err => console.log(err))
})



//>>>>>>>>>>> updated recipe handling <<<<<<<<<<<<<<<

router.post('/update-recipe/:id',(req,res)=>{
    const {id} = req.params
    const UpdatedRecipeData = req.body
    RecipeModel.findByIdAndUpdate(id,UpdatedRecipeData,{new: true})
    .then((result) => {
        console.log(result,'updated recipe')
        return res.json(result)
    }).catch(err => console.log(err))
})



 module.exports = router;