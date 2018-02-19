const express = require('express');
const app = express();
const db = require('./db');
const {Employee} = db.models;
const nunjucks = require('nunjucks');
app.set('view engine','html');
app.engine('html', nunjucks.render);
nunjucks.configure({noCache: true});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(require('method-override')('_method'))
const path = require('path')
app.use('/views', express.static('./views'))
app.use('/vendor', express.static("./node_modules"))

db.sync()
    .then(()=>db.seed())
    .then(employees=>{
        console.log(employees[2].managerId)
    })

app.use('/', require('./routes'))



const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening to ${port}`)
})