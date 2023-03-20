const { Sequelize } = require("sequelize");
const express  = require("express");

require('dotenv').config();

const sequelize = new Sequelize("move-in-sql", "movein", process.env.DBPASS, { host: "move-in.database.windows.net", dialect: "mssql" });
const app = express();

User = require("./models/user.model")(sequelize);

require("./routes/getUsers.get")(app, User);
require("./routes/addUser.post")(app, User)

app.listen(process.env.PORT, function() {
    console.log(`Listening on ${process.env.PORT}.`)
})