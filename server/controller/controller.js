let Userdb = require('../model/model');

//Create and save new user

exports.create = (req, res) => {

    //Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create new User

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //Save user to Database
    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `An error has occured while saving the user!`
            });
        });

}

//Retrieve user and return all or a single user
exports.find = (req, res) => {

    if (req.query.id) {

        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: `User not found with "${id}"!`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `An error has occured while retriving user the with "${id}"!`
            })
        })

    } else {

        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error has occured while retriving the user!"
                })
            })

    }


}

//Update a user by user id
exports.update = (req, res) => {

    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Data to update can be empty!"
            })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {
            useFindandModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update user with ${id}. Maybe the user cannot be found!`
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error Update User Information`
            })
        })

}

//Delete a user by user id
exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Delete user with ${id}. Maybe the user cannot be found!`
                })
            } else {
                res.send({
                    message: "User was deleted Succesfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete user with id "${id}"`
            })
        })

}