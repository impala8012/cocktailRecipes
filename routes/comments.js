const router = require('express').Router()
const pool = require('../db')

// GET comments
router.get("/", async(req, res, next) => {
  try {
    const comments = await pool.query("SELECT * FROM comments")
    res.status(200).json(comments.row)
  } catch (err){
    console.log(err.message)
    res.status(500).send("Server Error");
  }
})

// CREATE comment
router.post("/", async(req, res, next) =>{
  try {
    const { content, rating } = req.body;
    if(!content|| !rating) {
      return res.json("有欄位忘記填囉");
    }
    const newComment = await pool.query(
      "INSERT INTO comments (content, rating) VALUES ($1, $2) RETURNING *",
      [content, rating]
    );
    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error");
  }
})

// Update comments
router.put('/:id', async(req, res, next)=>{
  try{
    const {id} = req.params
    const {content, rating} = req.body
    const updatedComment = await pool.query(
      "UPDATE comments SET content = $1, rating = $2 WHERE comment_id = $3",
      [content, rating, id]
    );
    res.status(204).send("comment was updated");
  } catch(err) {
    console.log(err.message)
    res.status(500).send("Server Error");
  }
})

// DELETE comments
router.delete('/:id', async(req, res, next) => {
  try {
    const {id} = req.params
    const deletedCategory = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1",
      [id]
    );
    res.status(204).send("comment was deleted");
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error");
  }
})

module.exports = router