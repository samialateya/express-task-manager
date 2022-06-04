const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TasksController');

/* ------------------------ add middleware to router ------------------------ */
//add json middleware
router.use(require('../Middleware/JsonMiddleware'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* --------------------------- define the routes --------------------------- */
//@ initiate tasks controller object
const tasksController = new TasksController();
//?get all tasks
router.route('/').get((req, res) => tasksController.getAllTasks(req, res));
//?get a task by id
router.route('/:id').get((req, res) => tasksController.getTaskById(req, res));
//?create a new task
router.route('/').post((req, res) => tasksController.createTask(req, res));
//?update a task
router.route('/:id').put((req, res) => tasksController.updateTask(req, res));

module.exports = router;