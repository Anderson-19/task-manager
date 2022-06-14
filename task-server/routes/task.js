const express = require("express");
const { check } = require('express-validator');

const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task");

const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');
const { existsTaskID } = require('../helpers/db-validators');

router.get("/", validateJWT, getTasks);

router.post("/create", [
    validateJWT,
    check('name', 'Mandatory name').not().isEmpty(),
    check('tag', 'Mandatory tag').not().isEmpty(),
    check('date', 'Mandatory date').not().isEmpty(),
    check('hour', 'Mandatory hour').not().isEmpty(),
    check('description', 'Mandatory description').not().isEmpty(),
    check('img', 'Mandatory img').not().isEmpty(),
    validateField   
], createTask);

router.put("/:task_id", [
    validateJWT,
    check('task_id', 'Invalid ID').isMongoId(),
    check('task_id').custom( existsTaskID ),
    check('name', 'Mandatory name').not().isEmpty(),
    check('tag', 'Mandatory tag').not().isEmpty(),
    check('date', 'Mandatory date').not().isEmpty(),
    check('hour', 'Mandatory hour').not().isEmpty(),
    check('description', 'Mandatory description').not().isEmpty(),
    check('img', 'Mandatory img').not().isEmpty(),
    validateField
], updateTask);


router.delete("/:task_id", [
    validateJWT,
    check('task_id', 'Invalid ID').isMongoId(),
    check('task_id').custom( existsTaskID ),
    validateField
], deleteTask); 

module.exports = router 