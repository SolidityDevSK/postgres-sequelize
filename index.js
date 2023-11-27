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
      username: "TestName",
      password: "TestPass",
      age: 37,
    });
  })
  .then((data) => {
    data.username = "Noname";
    data.age = 45;
    console.log("User: ", data.toJSON());
    return data.save({ fields: ["age", "username"] });
  })
  .then((data) => {
    console.log("New Data");
    console.log(data.toJSON());
  })
  .catch(() => {
    console.log("Error");
  });
