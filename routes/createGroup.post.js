module.exports = (app, Group) => {
    app.post("/createGroup", async (req, res) => {
        if(!req.body.name) {
            res.status(400).send({"error": "You must provide a group name"});
        }
        try {
            let group = await Group.create({
                name: req.body.name
            });

            group.addUser(req.user)
            res.send(group)
        } catch(error) {
            if (error.errors) {
                res.status(400).send({error: error.errors[0].message})
                return
            }
            res.status(400).send({error: "Unknown error."})
        }
        

        
    })
}