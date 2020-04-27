exports.state = {
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
        }
    ],
    auth: [
        {
            id: 1,
            email: "dima-0510@mail.ru",
            login: "admin",
            password: "Lama1200"
        },
        {
            id: 2,
            email: "glazovadasha84@gmail.com",
            login: "dasha",
            password: "26gatteria"
        },
        {
            id: 3,
            email: "ivan2000@mail.ru",
            login: "ivan",
            password: "qwerty123"
        }
    ],
    totalUsersCount: 3
};