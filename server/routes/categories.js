const router = require("express").Router();
const pool = require("../db");

// GET All categorys
router.get("/", async (req, res, next) => {
  try {
    const categories = await pool.query(
      "SELECT * FROM categories LEFT JOIN (SELECT category_id as recipe_category_id, count(recipe_id) as recipes_count FROM recipes GROUP BY recipe_category_id) recipe_category_id on categories.category_id = recipe_category_id ORDER BY category ASC"
    );
    // console.log("get all category", categories);
    res.status(200).json({ status: "success", data: categories.rows });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// GET a category with recipes lists
router.get("/:id", async (req, res, next) => {
  const { per_page, page } = req.query;
  const { id } = req.params;
  try {
    if (page && per_page) {
      const offset = per_page * (page - 1);
      const categoryRecipes = await pool.query(
        "SELECT * FROM categories LEFT JOIN recipes ON categories.category_id = recipes.category_id WHERE categories.category_id = $1 ORDER BY categories.created_at DESC LIMIT $2 OFFSET $3 ",
        [id,per_page, offset]
      );
      // console.log(recipes);
      res.status(200).json({
        status: "success",
        categoryRecipesList: categoryRecipes.rows,
      });
    } else {
      const category = await pool.query(
        "SELECT * FROM categories WHERE category_id = $1",
        [id]
      );
      const categoryRecipes = await pool.query(
        "SELECT * FROM categories LEFT JOIN recipes ON categories.category_id = recipes.category_id WHERE categories.category_id = $1 ORDER BY categories.created_at DESC",
        [id]
      );
      // console.log("GET A category", categoryRecipes.rows[0]);
      res.status(200).json({
        status: "success",
        category: category.rows[0],
        categoryRecipesList: categoryRecipes.rows,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE a category
router.post("/", async (req, res, next) => {
  try {
    const { category, description } = req.body;
    // console.log("category", category);
    const newCategory = await pool.query(
      "INSERT INTO categories (category,category_desc) VALUES($1,$2) RETURNING *",
      [category, description]
    );
    console.log("post new category", newCategory);
    res.status(201).json({
      status: "success",
      data: { newCategory: newCategory.rows[0] },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Update category
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, description } = req.body;
    const newCategory = await pool.query(
      "UPDATE categories SET category = $1, description = $2 WHERE category_id = $3",
      [category, description, id]
    );
    res.status(204).json({
      status: "success",
      data: {
        category: newCategory.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE category
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await pool.query(
      "DELETE FROM categories WHERE category_id = $1",
      [id]
    );
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
