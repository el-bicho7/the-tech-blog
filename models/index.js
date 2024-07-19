const User = require('./User');
const Posts = require('./Posts');

// Creates a relationship between User and Posts model, with the User having a "has many" relationship with Posts model.
User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Posts model, with a "belongs to" relationship of the Posts to the User.
Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Posts };
