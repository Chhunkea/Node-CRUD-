const sequelize = require("./config/db");
const dotenv = require("dotenv");
const model = require("./Models/index");
const app = require("./app");

dotenv.config({ path: `${__dirname}/.env` });

const syncDB = async () => {
  try {
    // false != delete
    await sequelize.sync({ force: false, logging: false, alter: true });
  } catch (error) {
    console.log("Database sync failed", error);
    process.exit(1);
  }
};
syncDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on port : ${PORT}`);
});
