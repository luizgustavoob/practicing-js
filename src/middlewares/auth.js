const usersRepository  = require("../database/users")

const auth = async (req, res, next) => {
    const token = req.get("x-user");
    if (!token) {
        return res.status(401).send({"message": "x-user header should be informed"});
    }

    const user = await usersRepository.get(token)
    if (!user) {
        return res.status(401).send({"message": "invalid user"});
    }

    req.user = user;
    next();
}

module.exports = auth