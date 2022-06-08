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
router.route('/').get(tasksController.getAllTasks);
//?get a task by id
router.route('/:id').get(tasksController.getTaskById);
//?create a new task
router.route('/').post(tasksController.createTask);
//?update a task
router.route('/:id').put(tasksController.updateTask);
//?delete a task
router.route('/:id').delete(tasksController.deleteTask);

module.exports = router;