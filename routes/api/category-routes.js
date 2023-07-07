const router = require('express').Router();
const { Category, Product } = require('../../models');

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

//! NOTE: categoryName can be duplicated; not in acceptance criteria
// insert check here if needed later

router.post('/', async (req, res) => {
  //// DONE create a new category
  if(req.body.category_name.trim() != ""){
    try{ 
      const newCategoryData = await Category.create({
        category_name: req.body.category_name
      });
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
  if(req.body.category_name.trim() != ""){
    try{
      const updatedCategoryData = await Category.update(req.body, {
        where: {id: req.params.id}
      });
      //Commented out code outside of spec; preserving for future reference
      //if(updatedCategoryData[0]===0){
        //res.status(200).json(`${updatedCategoryData} changes were made; Name is already set to ${category_name}`)}
      //else{
        res.status(200).json(updatedCategoryData);
      //}
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
