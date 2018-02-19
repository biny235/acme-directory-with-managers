const conn = require('./conn');
const Employee = require('./Employee');

const sync = ()=>{
    return conn.sync({force: true});
}

const seed = ()=>{
    return Promise.all([
        Employee.create({email: 'Bernetta_Nivens@gmail.com'}),
        Employee.create({email: 'Garland_Leal@gmail.com', managerId: 1}),
        Employee.create({email: 'Brent_Berube@gmail.com', managerId: 1}),
    ])


}

module.exports = {
    sync,
    seed,
    models: {
        Employee
    }
}