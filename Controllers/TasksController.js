const TaskModel = require('../Models/TaskModel');
//import the API Errors handlers
const { ObjectNotFoundError, BadRequestError, ObjectUniquenessError, ServerError} = require('../Errors');
class TasksController{
	//*fetch all tasks
	async getAllTasks(req, res){
		const taskModel = await new TaskModel();
		const tasks = await taskModel.all();
		res.status(200).json(tasks);
	}

	//*find a task by id
	async getTaskById(req, res){
		const taskModel = await new TaskModel();
		const task = await taskModel.find(req.params.id);
		//?if no tasks are found 404
		if (!task) {
			throw new ObjectNotFoundError("Task not found");
		}
		res.json(task);
	}

	//*create a new task
	async createTask(req, res){
		//?handle empty inputs
		if (!req.body.name) {
			throw new BadRequestError('Task name is required');
		}
		try{
			const taskModel = await new TaskModel();
			await taskModel.create(
				{
					name: req.body.name || '',
				}
			);
			res.status(201).json({'message': 'Task created successfully'});
		}
		catch(err){
			//?check for name duplication
			if (err.code === '23505') {
				throw new ObjectUniquenessError('Task name already exists');
			}
			throw new ServerError('Server error');
		}
	}

	//*update a task
	async updateTask(req, res){
		//?handle empty inputs
		if (!req.body.name || !req.body.completed) {
			throw new BadRequestError('Either provide Task name OR completed status to make changes');
		}
		try{
			const taskModel = await new TaskModel();
			const taskID = req.params.id;
			const values = {};
			req.body.name ? values.name = req.body.name : '';
			req.body.completed ? values.completed = req.body.completed : '';
			await taskModel.update(taskID, values);
			res.status(200).json({'message': 'Task updated successfully'});
		}
		catch(err){
			//?handle empty inputs
			if (err.code === '42601') {
				res.status(400).send({ 'error': 'Invalid input' });
			}
			res.status(500).send({'error': err});
		}
	}

	//*delete a task
	async deleteTask(req, res){
		const taskModel = await new TaskModel();
		const taskID = req.params.id;
		await taskModel.delete(taskID);
		res.status(200).json({'message': 'Task deleted successfully'});
	}
}

module.exports = TasksController;