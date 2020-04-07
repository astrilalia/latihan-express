const express = require('express')
const app = express()
const port = 2000
const bodyParser = require('body-parser')
app.use(bodyParser())
const _ = require('underscore')
const fs = require('fs')

let data = [
    {
        id: 1,
        nama: 'apel',
        harga: 10000
    },
    {
        id: 2,
        nama: 'mangga',
        harga: 20000
    },
    {
        id: 3,
        nama: 'jeruk',
        harga: 30000
    },
    {
        id: 4,
        nama: 'kiwi',
        harga: 40000
    }
]
app.listen(port, () => console.log(`API active at port ${port}`))

app.get('/testing', (req, res) => {
    let newData = data
    console.log(req.query)
    let nama = req.query.nama
    let hargaMax = req.query.hargaMax
    let hargaMin = req.query.hargaMin
    if(nama){
        newData = newData.filter((val) => val.nama.includes(nama))
    }
    if(hargaMin){
        newData = newData.filter((val) => val.harga >= hargaMin)
    }
    if(hargaMax){
        newData = newData.filter((val) => val.harga <= hargaMax)
    }
    res.status(200).send(newData)
})

app.post('/try', (req, res) => {
    try{
    // testing blocks of code dalam try
    let { nama, usia, pekerjaan } = req.body
        fs.writeFileSync('invoice.txt', `Nama saya : ${nama}\nUsia saya ${usia} tahun\nKerja sebagai ${pekerjaan}`)
        let data = fs.readFileSync('invoice.txt', 'utf8')
        res.status(200).send(data)
    }catch(err){
        fs.unlinkSync('invoice.txt')
        res.status(500).send(err.message)
    }
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
const { userRouter, productRouter } = require('./router')
app.use('/users', userRouter)
app.use('/products', productRouter)
