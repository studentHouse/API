module.exports = (app, Group) => {
    app.post("/deleteGroup", async (req, res) => {
        if(!req.body.groupID) {
            res.status(400).send({"error": "You must provide a group ID."});
            return
        }
        let group = await Group.findOne({where: {id: req.body.groupID}, include: ['user']});

        if(!group) {
            res.status(400).send({error: "Group not found."})
            return
        }
        if(!req.user.hasGroup(group)) {
            res.status(400).send({error: "You can only delete groups you are a part of."})
            return
        }
        group.destroy();
        res.send({message: "Group deleted."})
    })
}