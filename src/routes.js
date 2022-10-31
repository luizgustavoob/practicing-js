const express = require("express");
const auth = require("./middlewares/auth")
const login = require("./controllers/userscontroller")
const TodosController = require("./controllers/todoscontroller")

const routes = express.Router();

routes.post("/login", login);

routes.get("/todolist", auth, TodosController.findAll);
routes.get("/todolist/:id", auth, TodosController.findOne);
routes.post("/todolist", auth, TodosController.add);
routes.put("/todolist/:id", auth, TodosController.update);
routes.put("/todolist/:id/finish", auth, TodosController.finish)
routes.delete("/todolist/:id", auth, TodosController.remove)

module.exports = routes;