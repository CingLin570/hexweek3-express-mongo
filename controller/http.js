const createError = require("http-errors");
const http = {
  notFound(req, res, next) {
    next(createError(404));
  },
  errorHandler(err ,req , res, next) {
    // 本地開發環境錯誤處理程序
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 用JSON顯示錯誤
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
}

module.exports = http;