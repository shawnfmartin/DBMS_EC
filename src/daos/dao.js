const mongoose = require('mongoose');
const looseSchema = require('./../schemas/schema');

const postToDB = (table, body) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.create(body);
};

const getTableData = (table, params) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.find(params).exec();
};

const getTableDataById = (table, id) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.findById(id).exec();
};

const updateTableData = (id, table, body) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.findByIdAndUpdate(id, body)
        .then(() => {
            return getTableDataById(table, id);
        });
};

const deleteTableDataById = (table, id) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.findByIdAndDelete(id).exec();
};

const deleteTableData = (table) => {
    const Model = mongoose.model(table, looseSchema.ModelSchema);
    return Model.deleteMany({})
};




// let schemaDetails = {}
// let keys = Object.getOwnPropertyNames(body);
// for (i in keys) {
//     let key = keys[i]
//     schemaDetails[key] = "String"
// }
//
// var Schema = mongoose.Schema(schemaDetails);
//
// // compile schema to model
// var Model = mongoose.model(table, Schema);
//
// Model.create(body, function (err) {
//     if (err) return handleError(err);
//     // saved!
// });
//};


module.exports = {
    postToDB,
    getTableDataById,
    getTableData,
    updateTableData,
    deleteTableDataById,
    deleteTableData
};