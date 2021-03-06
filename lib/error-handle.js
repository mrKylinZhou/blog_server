module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      msg: err.message
    }
  }
}
