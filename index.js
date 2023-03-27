const { Sequelize } = require("sequelize");
const express  = require("express");

require('dotenv').config();

const sequelize = new Sequelize("move-in-sql", "movein", process.env.DBPASS, { host: "move-in.database.windows.net", dialect: "mssql" });

const app = express();
const secure = express.Router();

app.use(express.json());


User = require("./models/user.model")(sequelize);

require("./middleware/auth.middleware")(secure, User);
require("./routes/getUsers.get")(secure, User);
require("./routes/signUp.post")(app, User)

app.use('/', secure);

// User.sync({ force: true });

app.listen(process.env.PORT, function() {
    console.log(`Listening on ${process.env.PORT}.`)
})