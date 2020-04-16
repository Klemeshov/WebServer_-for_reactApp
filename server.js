let app = require('express')();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser("asdasfsdsd"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let state = {
    users: [
        {
            id: 1,
            fullName: 'Димуля',
            status: '300',
            location: {
                country: "Рашка",
                city: "ЧеБлябинск"
            },
            followed: true
        },
        {
            id: 2,
            fullName: 'Дашуля',
            status: 'Отсоси у трахториста',
            location: {
                country: 'Расеюшка',
                city: 'ВолгогрАД'
            },
            followed: false
        },
        {
            id: 3,
            fullName: 'Иван',
            status: 'Везде насрал',
            location: {
                country: 'Казахстан',
                city: 'Астана'
            },
            followed: true
        },
        {
            id: 4,
            fullName: 'null',
            status: 'null',
            location: {
                country: 'null',
                city: 'null'
            },
            followed: true
        },
        {
            id: 5,
            fullName: 'null',
            status: 'null',
            location: {
                country: 'null',
                city: 'null'
            },
            followed: true
        },
        {
            id: 6,
            fullName: 'null',
            status: 'null',
            location: {
                country: 'null',
                city: 'null'
            },
            followed: true
        }
    ],
    totalUsersCount: 6
};

app.get('/auth/me', (req, res) => {
    res.cookie('id', '1', {
        maxAge: 3600 * 24 * 1000
    });
    if (req.cookies.id) {
        res.json({
            id: 1,
            email: "dima-0510@mail.ru",
            login: "admin",
            status: true
        })
    }else{
        res.json({
            status:false
        })
    }

});

app.get('/users', (req, res) => {
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
        totalUsersCount: state.totalUsersCount
    };
    for (let i = page * count; i < (Number(page) + Number(1)) * count; i++) {
        if (state.users[i] != null) {
            newState.users.push(state.users[i]);
        }
    }
    res.json(newState)
});

app.get('/profile/:id?', (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.cookies.id;
    }
    res.json(state.users[id - 1]);
});

app.listen(5000, () => {
    console.log("server started");
});