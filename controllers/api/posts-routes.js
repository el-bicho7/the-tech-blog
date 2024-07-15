const router = require('express').Router();
// Import models
const { Posts, User} = require('../../models');
const withAuth = require('../../utils/auth');

// ERASE AT THE END

router.get('/', async (req, res) => {
    try {
        const postsData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Posts }],
          });
        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;