
module.exports = (app, User) => {
    app.post("/signUp", async (req, res) => {
        try {
            let newUser = await User.create(req.body);
            message = "User created."
        }
        catch(error) {
            let message = error.errors[0].message;
            message = message ? message : "Unknown error occured.";
        }
        res.send({message});
    })
}