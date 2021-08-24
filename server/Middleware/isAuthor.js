const pool = require("../db");

module.exports = async (req, res, next) => {
  try {
  const {id} = req.params
  const {userId} = req.user.id
  const recipe = await pool.query("SELECT user_id FROM recipes WHERE recipe_id = $1",[id])
  // console.log("recipe from isAuthor", recipe)
  if (recipe.user_id === userId) {
    return next();
  } else {
    res.json("Accness Denied");
    res.redirect("back");
  }
  } catch(err){
    console.log(err.message)
  }
}