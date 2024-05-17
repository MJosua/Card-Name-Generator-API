var express = require('express');
var router = express.Router();
const indexController = require('../controller/indexController');
/* GET home page. */

// Define routes for /test
router.get('/listEmployeeNameonly', indexController.getListEmployeeName);
router.get('/employeeData', indexController.getEmployeeData);
router.post('/setemployeeData', indexController.setEmployeeData);
router.post('/editemployeeData', indexController.updateEmployeeData);
router.post('/deletemployeeData', indexController.deleteeEmployeeData);
module.exports = router;