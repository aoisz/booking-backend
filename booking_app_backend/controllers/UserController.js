const UserData = require('../data/User');
const config = require('../config');

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user_rs = await UserData.createUser(data)

        //
        console.log("POST - " + config.url + "/api/user")
        res.send(user_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addUser
}