// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//! DONE: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

//! DONE: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

//! DONE?:  Products belongToMany Tags (through ProductTag)
Product.belongsTo(ProductTag, {
  foreignKey: 'tag_id'
});

//! DONE?:  Tags belongToMany Products (through ProductTag)
Tag.belongsTo(ProductTag, {
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
