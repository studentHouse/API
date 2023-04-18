module.exports = (app, Group) => {
    app.get("/getGroups", async (req, res) => {
        let groups = await Group.findAll({include: ['user']});
        res.send(groups);
    })
}