"use strict";
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*' /*'Origin, X-Requested-With, Content-Type, Accept'*/);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});
const data = require('./data/reports_copy.js');
console.log(data);
app.get('/reports', function (req, res) {
    // console.log(data);
    res.json(data);
});
app.put('/reports/:reportId', function (req, res) {
    let { reportId } = req.params;
    // console.log(reportId);
    let { elements } = data;
    let newState = req.header('newState');
    // console.log(newState);
    let response = { ticketState: 'OPEN' };
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.payload.reportId === reportId) {
            element.state = newState;
            data.elements[i] = element;
            response.ticketState = element.state;
        }
    }
    res.json(response);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
