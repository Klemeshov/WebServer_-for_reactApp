const {state} = require('./State');

exports.setUsers =(db)=> (req, res) => {
    let page = 0;
    let count = 5;

    if (req.query.page != null) {
        page = req.query.page;
    }
    if (req.query.count != null) {
        count = req.query.count;
    }
    let newState = {
        users: [],
        totalUsersCount: 3
    };
    db.collection('Users').find({},{limit:Number(count), skip: Number(count)*Number(page)}).toArray().then(result=>{
        newState.users = result;
        res.json(newState);
    },err=>{
        res.sendStatus(500);
    });
};