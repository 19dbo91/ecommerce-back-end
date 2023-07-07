const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  //// DONE find all tags
  //// DONE be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  //// DONE find a single tag by its `id`
  //// DONE  be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(
      req.params.id, {
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
  
});

//! ESCALATE : tagName can be duplicated; not specified in acceptance criteria
router.post('/', async (req, res) => {
  /* SAMPLE req.body should look like this...
    {
      tag_name: "Basketball",
      productIds: [1, 2, 3, 4]
    }
  */
  //// DONE create a new tag
  const trimmedTagName = req.body.tag_name.trim();
  if(trimmedTagName != ""){
    //const [foundDuplicate] = await Tag.findAll({where: {tag_name: trimmedTag}});
    //if(foundDuplicate){res.status(400).json("ERROR 400: Bad Request - Duplicate")}
      //else{ //else prevents "header" issues
    try{
      const newTagData = await Tag.create({
        tag_name: trimmedTagName
      });

      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.productIds.length) {
        const productTagIdArr = req.body.productIds.map((product_id) => {
          return {
            product_id,
            tag_id: newTagData.id
          };
        });
        ProductTag.bulkCreate(productTagIdArr);
      }


      // if no product tags, just respond
      res.status(200).json(newTagData);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{ //added to prevent nonsense empty string tag
    res.status(400).json("ERROR 400: Bad Request - null string");
  }
});

router.put('/:id', async (req, res) => {
  //// DONE update a tag's name by its `id` value
  const trimmedTagName = req.body.tag_name.trim();
  if(trimmedTagName != ""){
    //const [foundDuplicate] = await Tag.findAll({where: {tag_name: trimmedTag}});
    //if(foundDuplicate){res.status(400).json("ERROR 400: Bad Request - Duplicate")}
      //else{ //else prevents "header" issues
    try{
      const updatedTagData = await Tag.update(req.body, {
        where: {id: req.params.id}
      });

      if (req.body.productIds && req.body.productIds.length) {
        
        const filteredProductTags = await ProductTag.findAll({
          where: { tag_id: req.params.id }
        })
        // create filtered list of new product_ids
        const productTagIds = filteredProductTags.map(({ product_id }) => product_id);
        const newProductTags = req.body.productIds
          .filter((product_id) => !productTagIds.includes(product_id))
          .map((product_id) => {
            return {
              product_id,
              tag_id: req.params.id
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = filteredProductTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
        // run both actions
        Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags)
        ]);
      }
      res.status(200).json(updatedTagData);
    } catch(err){
      res.status(500).json(err);
    }
  }
  else{ //added to prevent nonsense empty string tag; see delete
    res.status(400).json("ERROR 400: Bad Request - null string");
  }
});

router.delete('/:id', async (req, res) => {
  //// DONE delete on tag by its `id` value
  try{
    const trashTag = await Tag.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json(trashTag);
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
