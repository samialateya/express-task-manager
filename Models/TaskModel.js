const DBClient = require('../Helper/DBClient');

class TaskModel {
	#table = 'tasks';
	#limit;
	#taskDBClint;
	#condition;

	//?connect to the database and return the client object
	constructor() {
		return new Promise(async (resolve, reject) => {
			try {
				this.#taskDBClint = await (new DBClient());
				resolve(this);
			}
			catch (err) {
				reject(err);
			}
		});
	}

	//*fetch tasks
	async all() {
		try {
			const tasks = await this.#taskDBClint.fetchData(this.#table, '*', '', '', '');
			return tasks;
		}
		catch (err) {
			throw err;
		}
	}

	//*find a task by id
	async find(id) {
		try {
			//set the limit to one
			this.#limit = 'LIMIT 1';
			//set the condition
			this.#condition = `WHERE id = ${id}`;
			const task = await this.#taskDBClint.fetchData(this.#table, '*', this.#condition, '', this.#limit);
			return task[0];
		}
		catch (err) {
			throw err;
		}
	}

	//*create a new task
	async create(task) {
		try {
			const columns = 'name';
			const values = `'${task.name}'`;
			const result = await this.#taskDBClint.insertData(this.#table, columns, values);
			return result;
		}
		catch (err) {
			throw err;
		}
	}
}

module.exports = TaskModel;