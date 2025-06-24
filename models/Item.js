const mongoose = require('mongoose');

// Define the schema (structure)
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,     // It's a string
        required: true    // It must be provided
    }
});

// Export the model to use elsewhere in the app
module.exports = mongoose.model('Item', ItemSchema);
