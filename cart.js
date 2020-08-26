'use strict';
const express = require('express');
const { defaults, Pool } = require('pg');
const { response, request } = require('express');
const expressShopDB = express.Router();

function getTable(filters) {
    const defaults = {
        limit: 10,
        filterType: 'and'
    }
}
let myFilters = { ...defaults, ...filters};
let query = "select * from shopping_cart"
let where = [];
let params = [];
if(myFilters.id){
    params.push(myFilters.id);
    where.push(`id = $${params.length}::int`);
}
if(myFilters.length >= 10){
    params.push(myFilters.length);
    where.push(`length = $${params.length}::text`);
}
if(myFilters.maxPrice >= 3){
    params.push(myFilters.maxPrice);
    where.push(`price <=$${params.length}::int`);
}
if(myFilters.pageSize){
    params.push(myFilters.pageSize);
    where.push(`pageSize = $${params.length}::text`);
}

return pool.query(query, params)


expressShopDB.get('/', function (req, res) { //cant figure out why this is unreachable
    let filter = {};
    filter.limit = req.query.limit;
    filter.id = req.query.id;
    filter.pageSize = req.query['pageSize'];
    filter.filterType = request.query.filter;
    getTable(filter).then(result => {
        let data = result.rows;
        response.json(data);
    });
});

expressShopDB.get('/:id', (req, res) =>{
    getTable({id:request.params.id}).then(result => {
        let data = result.rows;
        response.json(data);
    });
});

module.exports = cart;