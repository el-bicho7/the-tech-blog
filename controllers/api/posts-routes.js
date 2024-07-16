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

router.post('/',  async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Posts.create({
      ...req.body, 
      // user_id: req.session.user_id,
    })
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;