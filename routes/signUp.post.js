var jwt = require('jsonwebtoken');

module.exports = (app, User) => {
    app.post("/signUp", async (req, res) => {

        console.log(req.body)

        if(!req.body.email) {
            res.status(400).send({"error": "email is required."});
            return;
        }

        let response = {};

        let user = await User.findOne({where: {email: req.body.email}});

        if(user) {
            res.status(400).send({"error": "Username taken."});
            return
        }

        try {
            let newUser = await User.create(req.body);

            let token = jwt.sign({
                email: newUser.email
            }, process.env.SECRET, { expiresIn: '2h'});
            
            newUser.update({token})

            response.token = token;
            response.message = "User created."
        }
        catch(error) {
            let message = error.errors[0].message;
            response.message = message ? message : "Unknown error occured.";
        }
        res.send(response);
    })
}