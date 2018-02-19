const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
},
    {
    getterMethods: {
        name(){
            const atSign = this.email.indexOf('@');
            return this.email.slice(0, atSign);
        },
        emailProvider(){
            const atSign = this.email.indexOf('@');
            return this.email.slice(atSign + 1)
        }
    }
});

Employee.createFromForm = function(body){
    if(body.managerId === '-1'){
        delete body.managerId
    }
    return this.create(body)
}
Employee.prototype.updateFromForm = function(id, body){
    if(body.managerId === '-1'){
        body.managerId = null;
    }
    return Employee.update(body, {where: {id: id}})
}


Employee.belongsTo(Employee, {as: 'manager'})
Employee.hasMany(Employee, {as: 'worker', foreignKey: 'managerId'})
module.exports = Employee;