const { randomUUID } = require("crypto")
const todosRepository = require("../database/todos")

const add = async (req, res) => {
    const author = req.user;
    const { title, description } = req.body;

    const id = randomUUID();
    const saved = await todosRepository.insert(id, {id, author, title, description, completed: false});

    return res.status(201).send({...saved});
}

const update = async (req, res) => {
    const author = req.user;
    const { id } = req.params;

    const todo = await todosRepository.getOne(id, author);
    if (!todo) {
        return res.status(404).send({message: "Todo not found"});
    }

    const { title, description } = req.body;
    const updated = await todosRepository.update(id, {...todo, title, description});
    
    return res.status(200).send({...updated});
}

const finish = async (req, res) => {
    const author = req.user;
    const { id } = req.params;

    const todo = await todosRepository.getOne(id, author);
    if (!todo) {
        return res.status(404).send({message: "Todo not found"});
    }

    const updated = await todosRepository.update(id, {...todo, completed: true});
    
    return res.status(200).send({...updated});
}

const findOne = async (req, res) => {
    const author = req.user;
    const { id } = req.params;

    const todo = await todosRepository.getOne(id, author);
    if (!todo) {
        return res.status(404).send({message: "Todo not found"});
    }

    return res.status(200).send({...todo});
}

const findAll = async (req, res) => {
    const author = req.user;

    const todos = await todosRepository.getAll(author);

    return res.status(200).send([...todos]);
}

const remove = async (req, res) => {
    const author = req.user;
    const { id } = req.params;

    try {
        await todosRepository.remove(id, author);
    
        return res.status(204).send();
    } catch (e) {
        return res.status(401).send({"message": e});
    }
}

module.exports = { add, update, finish, findOne, findAll, remove };