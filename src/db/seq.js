const { Sequelize } = require("sequelize");

const seq = new Sequelize("blog_admin", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});
 
seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((error) => {
    console.log("数据库连接失败", error);
  });
