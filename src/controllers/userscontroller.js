const usersRepository = require('../database/users')

module.exports = async (req, res) => {
    const { user, password } = req.body;

    try {
        const token = await usersRepository.auth(user, password);
        return res.status(200).send({"token": token});
    } catch (e) {
        return res.status(400).send({"message": e});
    }
}