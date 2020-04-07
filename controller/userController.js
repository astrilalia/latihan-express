const db = require('../database');

let data = [
    {
        id: 1,
        username: 'astrilalia',
        password: 'abc123',
        role: 'user'
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin',
        role: 'admin'
    }
]

module.exports = {
    getAllUsers : (req, res) => {
        res.status(200).send(data)
    },
    getUserById : (req, res) => {
        let byId = data.find((val) => val.id === parseInt(req.params.id))
        console.log(byId)
        if(byId){
            res.status(200).send(byId)
        }else{
            res.status(404).send('Not Found')
        }
    },
    searchByUsername : (req, res) => {
        let username = req.query.username
        let search = data.filter((val) => val.username.includes(username))
        // console.log(search)
        if(search.length>0){
            res.status(200).send(search)
        } else {
            res.status(404).send('Not Found')
        }
    },
    login: (req, res) => {
        let username = req.query.username
        let password = req.query.password
        let login = data.find((val) => val.username === username && val.password === password)
        if(login){
            res.status(200).send(login)
        }else{
            res.status(404).send('Not Found')
        }
    },
    searchByRole : (req, res) => {
        let role = req.query.role
        let searchRole = data.filter((val) => val.role === role)
        if(searchRole){
            res.status(200).send(searchRole)
        }else{
            res.status(404).send('Not Found')
        }
    },
    loginsql : (req, res) => {
        let { username, password } = req.body
        let sql = `select username, password users where username = ${username} and password = ${password}`
        db.query(sql, (err, results) => {
            if(err){
                res.status(404).send(err.message)
            }
            if(results.length !== 0){
                res.status(200).send({
                    status : 'Logged In',
                    message : 'Data Successfully LoggedIn'
                })
            } else {
                res.status(404).send({
                    status : 'Not Found',
                    message : 'Data is not found'
                })
            }
        })
    }
    // ,
    // register : (req, res) => {

    // }
}