const {state} = require('./State');
const ObjectId = require('mongodb').ObjectID;


exports.auth = (db) => (req, res) => {
    if (req.cookies.id) {
        db.collection('auth').findOne({_id: req.cookies.id}).then(result => {
            if (result)
                res.json({
                    ...result,
                    password: null,
                    isAuth: true
                });
            else
                res.json({
                    isAuth: false
                })
        }, err => {
            res.sendStatus(500);
        });
    } else {
        res.json({
            isAuth: false
        })
    }
};

exports.login = (db) => (req, res) => {
    if (!req.body.login || !req.body.password) {
        res.json({
            isAuth: false,
            message: "error getting data"
        });
        console.warn("error getting data")
    } else {

        db.collection('auth').findOne({login: req.body.login}).then(user => {
            if (!user) {
                res.json({
                    isAuth: false,
                    message: "login doesn't exist"
                });
            } else {
                if (user.password !== req.body.password) {
                    res.json({
                        isAuth: false,
                        message: "password is incorrect"
                    });
                } else {
                    if (req.body.rememberMe) {
                        res.cookie('id',user.id, {
                            maxAge: 1000*60*60*24*30*4
                        })
                    } else {
                        res.cookie("id", user.id, {
                            maxAge: 1000*60*60
                        })
                    }
                    res.json({
                        ...user,
                        password: null,
                        isAuth: true
                    })
                    console.log(user)
                }
            }
        }, err => {
            res.statusCode(500);
        });
    }
};

exports.logout = (db) => (req, res) =>{
    res.cookie("id", null);
    res.json({
        isAuth:false
    })
};