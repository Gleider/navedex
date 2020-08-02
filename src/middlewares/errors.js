module.exports = {
  notFoundError(err, req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  },

  generalErrors(err, req, res) {
    res.status(err.status || 500).json({ Error: err });
  },
};
