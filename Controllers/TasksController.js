const TaskModel = require('../Models/TaskModel');

class TasksController{
	//*fetch all tasks
	async getAllTasks(req, res){
		try{
			const taskModel = await new TaskModel();
			const tasks = await taskModel.all();
			res.status(200).json(tasks);
		}
		catch(err){
			console.log(err);
			res.status(500).send({'error': err});
		}
	}

	//*find a task by id
	async getTaskById(req, res){
		try{
			const taskModel = await new TaskModel();
			const task = await taskModel.find(req.params.id);
			//?if no tasks are found 404
			if (!task) {
				res.status(404).send({ 'error': 'No tasks found' });
			}
			res.status(200).json(task);
		}
		catch(err){
			console.log(err);
			res.status(500).send({'error': err});
		}
	}

	//*create a new task
	async createTask(req, res){
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
			console.log(err);
			//?check for name duplication
			if (err.code === '23505') {
				res.status(400).send({ 'error': 'Task already exists' });
			}
			res.status(500).send({'error': err});
		}
	}

	//*update a task
	async updateTask(req, res){
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
			console.log(err);
			res.status(500).send({'error': err});
		}
	}

	//*delete a task
	async deleteTask(req, res){
		try{
			const taskModel = await new TaskModel();
			const taskID = req.params.id;
			await taskModel.delete(taskID);
			res.status(200).json({'message': 'Task deleted successfully'});
		}
		catch(err){
			console.log(err);
			res.status(500).send({'error': err});
		}
	}
}

module.exports = TasksController;