const router = require('express').Router();
const db = require('../db');
const {Employee} = db.models;
const path = require('path');

router.use((req, res, next)=>{
    res.locals.path = req.url;
    Employee.findAll()
        .then(employees=>{
            res.locals.employeeCount = employees.length;
            return Employee.findAll({where: {managerId: {$ne:null}}})
        })
        .then(employees => {
            uniqManager = [];
            employees.forEach((employee)=>{
                if(uniqManager.indexOf(employee.managerId) === -1){
                    uniqManager.push(employee.managerId)
                }
            })
            res.locals.managerCount = uniqManager.length
            next()
        })
        .catch(next)
})

router.get('/', (req,res,next)=>{
    res.render('index', {title: 'homepage'});
})

router.get('/employees', (req, res, next)=>{
    Employee.findAll({include:[{
        model: Employee,
        as: 'manager'
    }],
    include:[{
        model: Employee,
        as: 'worker'
    }]})
        .then(employees=> res.render('employees', {title: 'Employees', employees: employees}))
        .catch(next)
});

router.post('/employees', (req, res, next)=>{
    Employee.createFromForm(req.body)
        .then(employee => res.redirect('/employees'))
        .catch(next)
});

router.patch('/employees/:id', (req,res,next)=>{
    Employee.findById(req.params.id)
        .then(employee => {
            employee.updateFromForm(req.params.id, req.body)
        })
        .then(()=>{
            res.redirect('/employees')
        })
        .catch(next)
});

router.delete('/employees/:id', (req,res,next)=>{
    Employee.findById(req.params.id)
        .then(employee=>{
            employee.destroy()
        })
        .then(()=>{
            res.redirect('/employees')
        })
        .catch(next)
});

module.exports = router;