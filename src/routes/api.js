var router = require('express').Router();
var dao = require('../daos/dao');

router.get('/', function (req, res, next) {
    res.send('Welcome to the router.')
});

router.post('/:table', function (req, res, next) {
    let body = req.body;
    let table = req.params.table;
    return dao.postToDB(table, body)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.get('/:table', function (req, res, next) {
    let table = req.params.table;
    let params = req.query;
    return dao.getTableData(table, params)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.get('/:table/:id', function (req, res, next) {
    let table = req.params.table;
    let id = req.params.id;
    return dao.getTableDataById(table, id)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.put('/:table/:id', function (req, res, next) {
    let table = req.params.table;
    let id = req.params.id;
    let body = req.body;
    return dao.updateTableData(id, table, body)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.delete('/:table/:id', function (req, res, next) {
    let table = req.params.table;
    let id = req.params.id;
    return dao.deleteTableDataById(table, id)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.delete('/:table', function (req, res, next) {
    let table = req.params.table;
    return dao.deleteTableData(table)
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

router.post('/:table1/:id1/:table2/:id2', function (req, res, next) {
    let table1 = req.params.table1;
    let id1 = req.params.id1;
    let table2 = req.params.table2;
    let id2 = req.params.id2;


    let mappingTable1 = table1 + "_" + table2;
    let mappingTable2 = table1 + "_" + table2;

    queries = [];
    queries.push(dao.getTableDataById(table1, id1));
    queries.push(dao.getTableDataById(table2, id2));

    let body = {}
    Promise.all(queries).then(data => {
        let table1Data = data[0];
        let table2Data = data[1];

        body[table1] = table1Data._id;
        body[table2] = table2Data._id;

        return body;
    })
        .then(data => {
            return dao.postToDB(mappingTable1, data)
        })
        .then(data => {
            res.send(data)
            return dao.postToDB(mappingTable2, data)
        })

});

router.get('/:table1/:id/:table2', function (req, res, next) {
    let table1 = req.params.table1;
    let id = req.params.id;
    let table2 = req.params.table2;

    let mappingTable1 = table1 + "_" + table2;

    return dao.getTableData(mappingTable1, {}).then(data => {
        queries = [];

        results = []
        for (i in data) {
            let row = JSON.parse(JSON.stringify(data[i]));
            let table1_id = row[table1];
            let table2_id = row[table2];

            console.log(row)
            queries.push(dao.getTableDataById(table1, id));
            queries.push(dao.getTableDataById(table2, id));

            Promise.all(queries).then( results => {
                let table1idresult = results[0];
                let table2idresult = results[1];

                if (table2idresult === table2_id && table1idresult === table1_id) {
                    console.log("hi")
                }
            })
        }

        // console.log(table1Data)
        // console.log(table2Data)
        // console.log(table1table2Data)
        // let table2Id = table2Data._id;
        // let x = table1table2Data[table2]
        // let table1Id = table1Data._id;
        // let y = table1table2Data[table1]

        // console.log(table2Id)
        // console.log(x)
        // console.log(table1Id)
        // console.log(y)
    });
});

module.exports = router;