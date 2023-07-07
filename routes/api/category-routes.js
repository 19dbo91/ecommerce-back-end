const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findByPk } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //// DONE find all categories
  //// DONE be sure to include its associated Products
  try{
    const allCategoryData = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(allCategoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  //// DONE find one category by its `id` value
  //// DONE be sure to include its associated Products
  try{
    const requestedCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!requestedCategoryData){
      res.status(404).json(requestedCategoryData); //"ERROR 404: ID not found."
    }
    else{
      res.status(200).json(requestedCategoryData);
    }
  }catch(err){
    res.status(500).json(err);
  }
});

//! ESCALATE : categoryName can be duplicated; not in acceptance criteria
router.post('/', async (req, res) => {
    /* SAMPLE req.body should look like this...
    {
      category_name: "Accessories",
      productIds: [1, 2, 3, 4]
    }
    */

  //// DONE create a new category
  const trimmedCategoryName = req.body.category_name.trim();
  if(trimmedCategoryName != ""){
    //const [foundDuplicate] = await Category.findAll({where: {category_name: trimmedCategoryName}});
    //if(foundDuplicate){res.status(400).json("ERROR 400: Bad Request - Duplicate")}
      //else{ //else prevents "header" issues
    try{ 
      const newCategoryData = await Category.create({
        category_name: req.body.category_name
      });
      //if productsIds, update each product to new Category
      const newCategoryID = {category_id: newCategoryData.id}
      if (req.body.productIds && req.body.productIds.length) {
        for (const productID of req.body.productIds){
          const updatedProduct = await Product.update(newCategoryID,{
            where: {id: productID}
          });
          console.log(updatedProduct);
        }
      }

      // if no product, just respond
      res.status(200).json(newCategoryData);
    } catch(err){
      res.status(500).json(err);
    }
  }
  else{ //added to prevent nonsense empty string category
    res.status(400).json("ERROR 400: Bad Request - null string");
  }
});

router.put('/:id', async (req, res) => {
  //// DONE update a category by its `id` value
  const trimmedCategoryName = req.body.category_name.trim();
  if(trimmedCategoryName != ""){
    try{
      //const [foundDuplicate] = await Category.findAll({where: {category_name: trimmedCategoryName}});
      //if(foundDuplicate){res.status(400).json("ERROR 400: Bad Request - Duplicate")}
        //else{ //else prevents "header" issues
      const updatedCategoryData = await Category.update(req.body, {
        where: {id: req.params.id}
      });
      
      
      
      res.status(200).json(updatedCategoryData);
    } catch(err){
      res.status(500).json(err);
    }
  }
  else{ //added to prevent nonsense empty string category; see delete
    res.status(400).json("ERROR 400: Bad Request - null string");
  }
});

router.delete('/:id', async (req, res) => {
  //// DONE delete a category by its `id` value
  try{
    const trashCat = await Category.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json(trashCat)
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
