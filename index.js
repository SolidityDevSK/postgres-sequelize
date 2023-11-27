const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

const sequelize = new Sequelize("postgres", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    wittCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

User.sync({ force: true })
  .then(() => {
    return User.create({
      username: "Srdr89",
      password: "TestPass",
      age: 37,
    });
  })
  .then((data) => {
    console.log("User: ", data.toJSON());
    return data.destroy();
  })
  .catch(() => {
    console.log("Error");
  });
