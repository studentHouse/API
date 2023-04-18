var jwt = require('jsonwebtoken');

module.exports = (app, User) => {
    app.post("/signUp", async (req, res) => {
        let response = {};

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
            response.error = message ? message : "Unknown error occured.";
        }
        res.send(response);
    })
}
