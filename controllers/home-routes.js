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

    const posts = postData.map(post => {
      const plainPost = post.get({ plain: true});
      plainPost.date = new Date(plainPost.date).toLocaleDateString('en-US');
      return plainPost;
    });
    
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: { user_id: req.session.user_id },
      include: [{ 
        model: User, 
        attributes: ['name'],
      }],
    });
    
    const userPost = postData.map(posts => {
      const plainPost = posts.get({ plain: true});
      plainPost.date = new Date(plainPost.date).toLocaleDateString('en-US');
      return plainPost;
    });

    res.render('dashboard', {
      posts: userPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new-post', async (req, res) => {
  res.render('new-post');
});

router.get('/update-post/:id', async (req, res) => {
  try {
    const postId = await Posts.findOne({
      where: { id: req.params.id }
    });

    const posts = postId.get({ plain: true });
    
    res.render('update-post', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id/comment', async (req, res) => {
  try {
    const postId = await Posts.findByPk({
      where: { id: req.params.id }
    });

    const posts = postId.get({ plain: true });
    res.render('comment', {posts})
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('signup');
});

module.exports = router;