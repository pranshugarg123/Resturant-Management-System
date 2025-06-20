const mongoose=require('mongoose')
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true
    },
    is_drink: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],  // An array of strings for multiple ingredients
        required: true
    },
    num_sales: {
        type: Number,
        default: 0  // Default to 0 if not specified
    },
    category:{
        type:String,
        enum: ['starter', 'main course', 'dessert', 'beverage'],
        required:true
    }
});
const MenuItem=mongoose.model('MenuItem',menuItemSchema)
module.exports=MenuItem
