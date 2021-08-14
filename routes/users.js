const router = require("express").Router();
const pool = require("../db");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// POST Login
router.post("/login", validInfo, async(req, res, next) =>  {
  const {email, password} = req.body
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
    if(!user.rows.length === 0) {
      return res.status(401).json("Password or Email incorrect");
    }
    const validPassword = await bcrypt.compare(
      password, user.rows[0].user_password
    )
    if(!validPassword){
      return res.status(401).json("Password or Email incorrect");
    }
    const token = jwtGenerator(user.rows[0].user_id)
    return res.status(200).json({token})
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error");
  }
});

// POST register
router.post("/register", upload.single('image'), validInfo, async(req, res, next) => {
  const {username, email, password} = req.body
  const {img} = req.file
  try {
    const user = await pool.query("SELECT * FROM user WHERE email = $1", [email])
    if(user.rows.length > 0) {
      return res.status(401).json("User Already Exist");
    }

    // bcrypt user password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt)
    let newUser = await pool.query(
      "INSERT INTO user(user_name, user_email, user_password,user_image) VALUES ($1, $2, $3,$4) RETURNING *",
      [username, emal, bcryptPassword, img]
    );
    const token = jwtGenerator(newUser.rows[0].user_id)
    return res.status(201).json({token})
  } catch (err){
    console.log(err.message)
    res.status(500).send("Server Error");
  }
});

// Verify the user
router.post("/verify", authorization, (req, res, next) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;