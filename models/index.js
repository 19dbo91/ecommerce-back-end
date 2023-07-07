// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//// DONE: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

//// DONE: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

//// DONE  Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id', 
  through: ProductTag,
  otherKey: 'tag_id',
  onDelete: 'SET NULL'
});

//// DONE Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag,
  otherKey: 'product_id',
  onDelete: 'SET NULL'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
