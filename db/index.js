const conn = require('./conn');
const Employee = require('./Employee');

const sync = ()=>{
    return conn.sync({force: true});
}

const seed = ()=>{
    return Promise.all([
        Employee.create({email: 'john_gross@gmail.com'}),
        Employee.create({email: 'josh_weiss@gmail.com', managerId: 1}),
        Employee.create({email: 'joe_wine@gmail.com', managerId: 1}),
    ])


}

module.exports = {
    sync,
    seed,
    models: {
        Employee
    }
}