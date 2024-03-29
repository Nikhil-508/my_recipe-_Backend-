const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ingredients:{
        type: String,
        required:true
    },
    instruction:{
        type:String,
    },
    imageUrl:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true

    }
})

// Create Recipe model
const RecipeModel = mongoose.model('recipes', RecipeSchema);

// Export Recipe model
module.exports = RecipeModel;