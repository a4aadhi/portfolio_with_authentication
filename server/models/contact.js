let mongoose= require('mongoose');


// creating a model class

let contactmodel = mongoose.Schema({
        name : String,
        number : Number,
        email: String
},
{

        collection: "contacts"

});

module.exports = mongoose.model('Contact',contactmodel);