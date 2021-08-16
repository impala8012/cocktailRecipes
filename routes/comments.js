const router = require("express").Router();
const pool = require("../db");

// GET comments
router.get("/recipes/:id/comments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments WHERE recipe_id = $1",
      [id]
    );
    res.status(200).json(comments.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE comment
router.post("/recipes/:id/comments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, rating } = req.body;
    if (!description || !rating) {
      return res.json("有欄位忘記填囉");
    }
    const newComment = await pool.query(
      "INSERT INTO comments (comment_description, comment_rating, recipe_id) VALUES ($1, $2, $3) RETURNING *",
      [description, rating, id]
    );
    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Update comments
router.put("/recipes/:id/comments/:comment_id", async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { description, rating } = req.body;
    const updatedComment = await pool.query(
      "UPDATE comments SET comment_description = $1, comment_rating = $2 WHERE comment_id = $3",
      [description, rating, comment_id]
    );
    res.status(204).json("update successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE comments
router.delete("/recipes/:id/comments/:comment_id", async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const deletedCategory = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1",
      [comment_id]
    );
    res.status(204).send("comment was deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
