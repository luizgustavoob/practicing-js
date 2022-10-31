class TodosRepository {
    constructor() {
        this.dbTodos = new Map();
    }

    async insert(key, value) {
        if (this.dbTodos.has(key)) {
            throw new String(`${key} already exists`);
        }
    
        this.dbTodos.set(key, value);
        return value;
    }

    async update(key, value, user) {
        const todo = this.dbTodos.get(key);
        if (!todo || todo.author !== user) {
            throw new String(`Todo not found`)
        }

        const updated = {...todo,...value}
        this.dbTodos.set(key, updated);
        return updated;
    }

    async getOne(key, user) {
        const todo = this.dbTodos.get(key);
        return todo && todo.author === user ? todo : null;
    }

    async getAll(user) {
        return [...this.dbTodos.values()].filter(todo => todo.author === user);
    }

    async remove(key, user) {
        const todo = await getOne(key, user);
        if (!todo) {
            throw new String(`Todo ID "${key}" not found to user ${user}`);
        }
    
        return this.dbTodos.delete(key);
    }
}

const todosRepository = new TodosRepository();
module.exports = todosRepository;