module.exports = (app, User) => {
  app.get("/getUsers", async (req, res) => {
    let users = await User.findAll({include: ['group']});
    res.send(users);
  });
};
