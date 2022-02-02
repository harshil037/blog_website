const router = require("express").Router();
const Comment = require("../models/Comment");

//CREATE COMMENT
router.post("/", async (req, res) => {
  const newComm = new Comment(req.body);
  try {
    const savedComm = await newComm.save();
    res.status(200).json(savedComm);
  } catch (err) {
    console.log("Error while calling comment" + err);
  }
});

//Get comments
router.get("/", async (req, res) => {
  try {
    const comm = await Comment.find();
    res.status(200).json(comm);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//DELETE comment
router.delete("/:id", async (req, res) => {
  try {
    const comm = await Comment.findById(req.params.id);
    if (
      comm.id === req.body.commentId ||
      comm.username === req.body.commentName
    ) {
      try {
        await comm.delete();
        res.status(200).json("comm has been deleted...!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your comm!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
