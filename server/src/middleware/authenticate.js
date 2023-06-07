const authenticate = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = authenticate;
