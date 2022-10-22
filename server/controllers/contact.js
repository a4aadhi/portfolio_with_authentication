let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let contact = require('../models/contact');

/* GET Route for the contact List page - READ Operation */
module.exports.displaycontactList = (req, res, next) => {
    contact.find((err, contactlist) => {

        if (err) {
            return console.error(err);

        }
        else {
            //console.log(contactlist);
            res.render('contact/list', { title: "Business Contact list", contactlist: contactlist });

        }
    });
}

module.exports.displayAddpage = (req, res, next) => {
    res.render('contact/add', { title: "Add Contact" });
}

module.exports.processAddpage = (req, res, next) => {
    let newContact = contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email

    });
    contact.create(newContact, (err, contact,) => {

        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the contact list 
            res.redirect('/contact-list');
        }

    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    contact.findById(id, (err, contactEdit) => {
        if (err) {
            console.log(err);
            response.end(err);

        }
        else {
            res.render('contact/edit', { title: 'Edit Contact', contact: contactEdit });
        }
    });

}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateContact = contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email

    });
    contact.updateOne({_id: id}, updateContact, (err) => {
        if (err) 
        {
            console.log(err);
            res.end(err);

        }
        else {
            //refresh the contact list 
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    contact.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);

        }
        else {
            //refresh the contact list 
            res.redirect('/contact-list');
        }
    });

}
