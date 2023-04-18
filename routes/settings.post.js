module.exports = (app, User) => {
    app.post("/settings", async (req, res) => {
        let currentValues = req.user.dataValues;
        delete req.body.email;
        delete req.body.password;
        delete req.body.id;
        delete currentValues.createdAt;
        delete currentValues.updatedAt;
        delete currentValues.id;

        req.user.update({...currentValues, ...req.body});

        res.send(req.user);
    });
}