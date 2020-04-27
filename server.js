const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const cookieParser = require('cookie-parser');
const {setUsers} = require("./users");
const {auth, login, logout} = require("./login");
const {getProfile, putStatus} = require("./profile");

const MongoClient = require('mongodb').MongoClient;


const cors = require('cors');

const uri = "mongodb+srv://MOGGER:Lama1200@myfirstm-1yfik.mongodb.net/test?retryWrites=true&w=majority";

const whitelist = ['http://localhost:3000',
    'http://192.168.43.244:3000',
    'http://127.0.0.1',
    'http://192.168.0.105:3000/',
    'https://klemeshov.github.io'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if(whitelist.includes(origin))
            return callback(null, true);

        callback(new Error('Not allowed by CORS'));
    },
    methods:["POST","GET", "PUT", "DELETE", "OPTIONS"],
    headers:["X-Requested-With", "content-type"]
};


let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser("HelloWorld"));
app.use(cors(corsOptions));

MongoClient.connect(uri, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database.db('WebSite');

    app.get('/auth/me', auth(db));
    app.post('/auth/login', login(db));
    app.delete('/auth/login', logout(db));

    app.get('/users', setUsers(db));

    app.get('/profile/:id?', getProfile(db));
    app.put('/profile/status', putStatus(db));

    // app.listen(5000, () => {
    //     console.log("server started");
    // });
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(5000, () => {
            console.log("server started");
        });
});
