const {state} = require('./State');
const ObjectId = require('mongodb').ObjectID;

exports.getProfile = (db) => (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.cookies.id;
    }
    db.collection('Users').findOne({_id: ObjectId(id)}).then(result => {
        res.json(result);
    }, err => {
        res.sendStatus(500);
    })
};

exports.putStatus = (db) => (req, res) => {
    if (!req.body.status || !req.cookies.id) {
        res.json({isOk: false});
    } else {
        const status = req.body.status;
        const id = req.cookies.id;

        db.collection('Users').updateOne({_id: ObjectId(id)}, {$set: {status}}).then(result => {
            res.json({
                isOk: true,
                status: status
            });
        }, err => {
            res.sendStatus(500);
            console.warn(err)
        });

    }
};