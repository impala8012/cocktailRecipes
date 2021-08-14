const router = require("express").Router();
const pool = require("../db");

// GET All categorys
router.get("/", async (req, res, next) => {
  try {
    const categories = await pool.query("SELECT * FROM categories");
    console.log("get all category", categories);
    res.status(200).json({status: "success",data: categories.rows});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// GET a category with recipes lists
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const category = await pool.query(
      "SELECT * FROM categories WHERE category_id = $1",
      [id]
    );
    const categoryRecipes = await pool.query(
      "SELECT * FROM categories LEFT JOIN recipes ON categories.category_id = recipes.category_id WHERE categories.category_id = $1",
      [id]
    );
    console.log("GET A category", categoryRecipes.rows[0]);
    res.status(200).json({
      status: "success",
      category: category.rows[0],
      categoryRecipesList: categoryRecipes.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE a category
router.post("/", async (req, res, next) => {
  try {
    const { category, description } = req.body;
    console.log("category", category);
    const newCategory = await pool.query(
      "INSERT INTO categories (category,category_desc) VALUES($1,$2) RETURNING *",
      [category,description]
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
      status:"success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
