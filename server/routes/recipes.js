const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const authorization = require("../middleware/authorization");
const isAuthor = require("../middleware/isAuthor");
// GET all recipes
router.get("/", async (req, res, next) => {
  const { per_page, page } = req.query;
  try {
    if (page && per_page) {
      const offset = per_page * (page - 1);
      const recipes = await pool.query(
        "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id as comments_recipe_id, COUNT(*) as comments_count FROM comments GROUP BY comments_recipe_id) comments ON recipes.recipe_id = comments_recipe_id LEFT JOIN (SELECT category_id as categories_category_id, category from categories) categories ON recipes.category_id = categories_category_id ORDER BY created_at DESC LIMIT $1 OFFSET $2 ",
        [per_page, offset]
      );
      // console.log(recipes);
      res.status(200).json(recipes.rows);
    } else if (per_page && !page) {
      const recipes = await pool.query(
        "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id as comments_recipe_id, COUNT(*) as comments_count FROM comments GROUP BY comments_recipe_id) comments ON recipes.recipe_id = comments_recipe_id LEFT JOIN (SELECT category_id as categories_category_id, category from categories) categories ON recipes.category_id = categories_category_id ORDER BY created_at DESC LIMIT $1 ",
        [per_page]
      );
      // console.log(recipes);
      res.status(200).json(recipes.rows);
    } else {
      const recipes = await pool.query(
        "SELECT * from recipes LEFT JOIN (SELECT recipe_id as comments_recipe_id, COUNT(*) as comments_count FROM comments GROUP BY comments_recipe_id) comments ON recipes.recipe_id = comments_recipe_id LEFT JOIN (SELECT category_id, category from categories) categories ON recipes.category_id = categories.category_id ORDER BY created_at DESC"
      );
      // console.log(recipes);
      res.status(200).json(recipes.rows);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// GET user recipes
router.get("/user-recipes", authorization, async (req, res, next) => {
    const { per_page, page } = req.query;

  try {
    const {id} = req.user
    const userRecipes = await pool.query(
      "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id as comments_recipe_id, COUNT(*) as comments_count FROM comments GROUP BY comments_recipe_id) comments ON recipes.recipe_id = comments_recipe_id LEFT JOIN (SELECT category_id, category from categories) categories ON recipes.category_id = categories.category_id WHERE user_id = $1 ORDER BY created_at DESC",
      [id]
    );
    res.status(200).json(userRecipes.rows);
  } catch(err){
    console.log(err.message)
    res.status(500).send("Server Error");
  }
});

// GET a recipes
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query(
      // "SELECT * FROM recipes LEFT JOIN (SELECT recipe_id as comment_recipe_id, comment_description, comment_rating FROM comments) comments ON recipes.recipe_id = comment_recipe_id WHERE recipes.recipe_id = $1",
      "SELECT * FROM recipes WHERE recipes.recipe_id = $1",
      [id]
    );
    // console.log(recipe);
    res.status(200).json(recipe.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE recipes
router.post(
  "/",
  upload.single("image"),
  authorization,
  async (req, res, next) => {
    try {
      // req.body.images = [];
      // for (const file of req.files) {
      //   req.body.images.push({
      //     path: file.path,
      //   });
      // }
      // console.log("req.body", req.body);
      // console.log("req.file", req.file);
      const { id } = req.user;
      const { title, ingredient, content, category_id } = req.body;
      if (!title || !ingredient || !content || !category_id) {
        return res.json("有欄位忘記填囉");
      }
      if (req.file) {
        const { path } = req.file;
        // const img1 = images[0].path;
        // const img2 = images[1].path;

        const newRecipe = await pool.query(
          "INSERT INTO recipes (recipe_title, recipe_ingredient,recipe_content,category_id, recipe_image_url, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;",
          [title, ingredient, content, category_id, path, id]
        );
        // console.log("newRecipe", newRecipe);
        res.status(201).json({
          status: "success",
        });
      } else {
        const newRecipe = await pool.query(
          "INSERT INTO recipes (recipe_title, recipe_ingredient,recipe_content,category_id, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
          [title, ingredient, content, category_id, id]
        );
        // console.log("newRecipe", newRecipe);
        res.status(201).json({
          status: "success",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update recipes
router.put(
  "/:id",
  upload.single("image"),
  authorization,
  isAuthor,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;
      const { title, ingredient, content, category_id } = req.body;
      if (req.file) {
        const { path } = req.file;
        const updatedRecipes = await pool.query(
          "UPDATE recipes SET recipe_title = $1, recipe_ingredient = $2,recipe_content = $3, category_id = $4, recipe_image_url =$5 WHERE recipe_id = $6 AND user_id = $7 RETURNING *;",
          // "WITH recipes AS (UPDATE recipes SET recipe_title = $1, recipe_ingredient = $2, recipe_content = $3, category_id = $4 WHERE recipe_id = $5 ) UPDATE recipe_images SET image_url = $6 WHERE recipe_id = $8 RETURNING *;",
          [title, ingredient, content, category_id, path, id, user_id]
        );
        res.status(204).send("comment was updated");
      } else {
        const updatedRecipes = await pool.query(
          "UPDATE recipes SET recipe_title = $1, recipe_ingredient = $2,recipe_content = $3, category_id = $4 WHERE recipe_id = $5 and user_id = $6 RETURNING *;",
          [title, ingredient, content, category_id, id, user_id]
        );
        res.status(204).send("comment was updated");
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// DELETE recipes
router.delete("/:id", authorization, isAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await pool.query(
      "DELETE FROM recipes WHERE recipe_id = $1",
      // "WITH recipes AS ( DELETE FROM recipes WHERE recipe_id = $1) DELETE FROM recipe_comments WHERE recipe_id = $1 RETURNING *",
      [id]
    );
    res.status(204).send("recipe was deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
