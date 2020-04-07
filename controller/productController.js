const db = require('../database');

module.exports = {
    getProduct : (req, res) => {
        let { orderBy, limit, offset } = req.params
        let sql =  `select * from product order by id ${orderBy} limit ${limit} offset ${offset}`;
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    searchProduct : (req, res) => {
        let { name, hargaMax, hargaMin } = req.query;
        let sql = `select * from product where nama like '%${name}%'`;
        // if(hargaMin || hargaMax){
        //     sql += ` and`
        // }
        if(hargaMin){
            sql += ` and harga > ${hargaMin}`
        }
        if(hargaMax){
            sql += ` and harga < ${hargaMax}`
        }
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    addproduct : (req, res) => {
        let { nama, harga } = req.body;
        let sql = `insert into product (nama, harga) values ('${nama}', ${harga})`;
        // insert into product set ?
        // db.query(sql, req.body, (err, results))
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status : 'created',
                message : 'Data Successfully Created'
            })
        })
    },
    editProduct : (req, res) => {
        let { id } = req.params
        let { harga } = req.body
        let sql = `update product set harga = ${harga} where id = ${id}`;
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status : 'updated',
                message : 'Data Successfully Updated'
            })
        })
    },
    deleteProduct : (req, res) => {
        let { id } = req.params
        let sql = `delete from product where id = ${id}`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status : 'deleted',
                message : 'Data Successfully Deleted'
            })
        })
    }
}