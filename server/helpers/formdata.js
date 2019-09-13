const processForm = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }
  next();
};

module.exports = {
  processForm,
};
