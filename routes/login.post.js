const bcrypt = require('bcrypt');

module.exports = (app, User) => {
    app.post("/login", async (req, res) => {
        try {
            let user = await User.scope("withPass").findOne({where: {email: req.body.email}});
            if(!user){
                res.send({error: "User not found."})
                return
            }

            if(await bcrypt.compare(req.body.password, user.password)) {
                
            }

            res.send({})

        } catch {
            res.send({error: "An unknown error occured."})
        }
        
    })
}