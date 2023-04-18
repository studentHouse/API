const { Sequelize } = require("sequelize");
const express  = require("express");

require('dotenv').config();

const sequelize = new Sequelize("move-in-sql", "movein", process.env.DBPASS, { host: "move-in.database.windows.net", dialect: "mssql" });

const app = express();
const secure = express.Router();

app.use(express.json());


User = require("./models/user.model")(sequelize);
Group = require("./models/Group.model")(sequelize);

User.belongsToMany(Group, { through: 'User_Group', as: 'group' });
Group.belongsToMany(User, { through: 'User_Group', as: 'user' });

require("./middleware/auth.middleware")(secure, User);
require("./routes/getUsers.get")(secure, User);
require("./routes/logout.post")(secure, User);
require("./routes/settings.post")(secure, User);

require("./routes/getGroups.get")(secure, Group);
require("./routes/createGroup.post")(secure, Group);
require("./routes/deleteGroup.post")(secure, Group);

require("./routes/signUp.post")(app, User);
require("./routes/login.post")(app, User);

app.use('/', secure);

// User.sync({ force: true });

// sequelize.sync({force: true})

app.listen(process.env.PORT, function() {
    console.log(`Listening on ${process.env.PORT}.`)
})