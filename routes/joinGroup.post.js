module.exports = (app, Group) => {
    app.post("/joingroup", async (req,res) => {
        if(!req.body.groupID) {
            res.status(400).send({"error": "You must provide a group ID."});
            return
        }
        let group = await Group.findOne({where: {id: req.body.groupID}});

        if(!group) {
            res.status(400).send({error: "Group not found."})
            return
        }

        group.addUser(req.user)
        res.send(group)
    });
}