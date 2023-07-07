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

//! NOTE: tagName can be duplicated; not in acceptance criteria
// insert check here if needed later

router.post('/', async (req, res) => {
  // TODO create a new tag
  if(req.body.tag_name.trim() != ""){
    try{
      const newTagData = await Tag.create({
        tag_name: req.body.tag_name
      });
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
  // TODO update a tag's name by its `id` value
  if(req.body.tag_name.trim() != ""){
    try{
      const updatedTagData = await Tag.update(req.body, {
        where: {id: req.params.id}
      });
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
