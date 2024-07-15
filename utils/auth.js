const withAuth = (req, res, next) => {
  // Redirect the starting session to the Login page if you are not do a logged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
