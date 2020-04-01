const express = require('express')
const app = express()
const port = 2000
const bodyParser = require('body-parser')
app.use(bodyParser())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my API</h1>')
})
app.post('/post', (req, res) => {
    console.log(req.body)
    //req.body => ambil data dari frontend (param kedua axios.post)
    if(req.body.username === 'astrilalia'){
        res.status(200).send('<h1>Lanjut</h1>')
    } else {
        res.status(500).send('<h1>Ga boleh</h1>')
    }
})
app.patch('/patch/:bebas/:haha', (req, res) => {
    console.log(req.params)
    // req.params =>data dari url endpoint /patch/:id/
    res.status(200).send('<h1>PATCH</h1>')
})
app.put('/put', (req, res) => {
    // console.log(req.query)
    // req.query => search => url
    res.status(200).send('<h1>PUT</h1>')
})
app.delete('/', (req, res) => {
    res.status(200).send('<h1>DELETE</h1>')
})

// Router = simpen semua alamat => url dan method
// Controller = function yang diexecute ketika url endpoint akses

// untuk akses function yang di halaman ini ke router
const { userRouter } = require('./router')
app.use('/users', userRouter)

app.listen(port, () => console.log(`API active at port ${port}`))