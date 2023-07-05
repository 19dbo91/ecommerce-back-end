const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //// DONE find all categories
  //// DONE be sure to include its associated Products
  try{
    const catData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  //// DONE find one category by its `id` value
  //// DONE be sure to include its associated Products
  try{
    const catData = await Category.findByPk(
      req.params.id, {
        include: {
          model: Product
        }
      }
    );
    // TODO: gracefully handle NULL id
    res.status(200).json(catData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // TODO create a new category
  const newCat  = req.body;
  console.log({newCat})
  // TAKE REQ BODY
  // SQL CREATE (REQ BODY)
});

router.put('/:id', (req, res) => {
  // TODO update a category by its `id` value
  // CHECK ID EXIST
  // YES TAKE REQ.BODY CATNAME AND SQL UPDATE IT
});

router.delete('/:id', (req, res) => {
  // TODO delete a category by its `id` value
  //CHECK ID
  // NO: SEND 404 ERROR
  // YES: SQL DESTROY
});

module.exports = router;
