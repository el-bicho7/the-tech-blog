const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: {
        model: User,
        attributes: ['name']
      }
    });

    const posts = postData.map(post => post.get({ plain: true}));

    res.render('homepage', {posts});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

module.exports = router;