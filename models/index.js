const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

// Creates a relationship between User and Posts model, with the User having a "has many" relationship with Posts model.
User.hasMany(Posts, {
  foreignKey: 'user_id',
});

Posts.hasMany(Comments, {
  foreignKey: 'posts_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Posts model, with a "belongs to" relationship of the Posts to the User.
Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.belongsTo(Posts, {
  foreignKey: 'posts_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Posts, Comments };
