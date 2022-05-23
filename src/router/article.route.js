const Router = require("koa-router");

const router = new Router({ prefix: "/user" });

// GET
router.get("/", (ctx, next) => {
  ctx.body = "user api";
});

module.exports = router