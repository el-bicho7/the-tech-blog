const router = require('express').Router();
// Import models
const { Posts, User} = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll();

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Add withAuth so only logged in users can post
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Posts.create({
      ...req.body, 
      user_id: req.session.user_id,
    })
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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