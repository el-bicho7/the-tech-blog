const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const post = [];
  for (const posts of postData) {
    const newPost = await Posts.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    post.push(newPost);
  };

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      userId: users[Math.floor(Math.random() * users.length)].id,
      postId: post[comment.post_id - 1].id,  // Adjusting to match the post ID
    });
  }

  process.exit(0);
};

seedDatabase();
