var jwt = require('jsonwebtoken');

module.exports = (app, User) => {
    app.post("/logout", async (req, res) => {
        req.user.update({token: ""})
        res.send({"message": "logged out."})
    })
}