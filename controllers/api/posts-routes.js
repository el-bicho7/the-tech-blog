const router = require('express').Router();
// Import models
const { Posts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll();

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const comments = await Posts.findOne({
      where: { user_id: req.params.id },
      include: [ User, Comments ]
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  
  try {
    const newPost = await Posts.create({
      ...req.body, 
      user_id: req.session.user_id,
    })
    
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id/comments', withAuth, async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: { posts_id: req.params.id }
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
      posts_id: req.params.id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
        date: new Date().toLocaleDateString('en-US'),
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const transactionData = await Posts.destroy({
      where: {
        id: req.params.id,
      }
    });
    
    if (!transactionData) {
      res.status(400).json({ message: 'No transaction found with that id.'});
      return;
    };

    res.status(200).json(transactionData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;