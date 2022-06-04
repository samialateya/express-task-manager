const express = require('express');
const router = express.Router();
//require tasks controller to map routes with the controller methods
const TasksController = require('../controllers/TasksController');

/* ------------------------ add middleware to router ------------------------ */
//add json middleware to send json responses by default
router.use(require('../Middleware/JsonMiddleware'));
//add body parser middleware to catch data from the client either in json or urlencoded format
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
//?delete a task
router.route('/:id').delete((req, res) => tasksController.deleteTask(req, res));

module.exports = router;