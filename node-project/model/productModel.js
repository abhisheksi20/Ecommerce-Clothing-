const mongoose = require('mongoose')

const clothingSchema = new mongoose.Schema({
    index: {
        type: Number
    },
    p_id: {
        type: Number
    },
    name: {
        type: String,
        
        trim: true,
        
    },
        
    price: {
        type: Number
    },
    colour: {
        type: String
    },
    brand: {
        type: String
    },
    img:{
        type: String
    },
    ratingCount: {
        type: Number
    },
    avg_rating: {
        type: Number
    },
    
    description: {
        type: String
    },
    
});

module.exports = mongoose.model('Clothing',clothingSchema)