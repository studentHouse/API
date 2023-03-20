
module.exports = (app, User) => {
    app.post("/addUser", async (req, res) => {
        await User.create({
            email: "benmacwill@gmail.com",
            password: "hi"
        })
        res.send("created");
    })
}