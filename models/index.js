// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//// DONE: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

//// DONE: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// TODO:  Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
});

// TODO:  Tags belongToMany Products (through ProductTag)
Tag.belongsTo(Product, {
  through: ProductTag,
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
