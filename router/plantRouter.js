const router = require('express').Router();
const fs = require('fs');

router.route('/:id').get((req,res)=>{
  const plant_name = req.params.id;
  const path = `plant-profile/${plant_name}.json`;

  console.log(`searching for ${plant_name}`);

  try {
    if (fs.existsSync(path)) {
      let rawdata = fs.readFileSync(path);
      let profile = JSON.parse(rawdata);
      res.status(200).json(profile);
    }
    else res.status(404).json(`There's no such plant named as ${plant_name}!`);
  } catch(err) {
    console.error(err);
    res.status(400).json(`Error in finding plant-profile`);
  }
});


module.exports = router;
