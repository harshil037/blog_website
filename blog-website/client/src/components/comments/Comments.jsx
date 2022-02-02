import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./comments.css";

export default function Comments({ post }) {
  const [comment, setComment] = useState("");
  const [comm, setComm] = useState([]);
  const { user } = useContext(Context);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: user._id,
      username: user.username,
      postId: post._id,
      comment,
    };
    try {
      await axios.post("/comments", newComment);
      setToggle((prev) => !prev);
      // window.location.replace(`/post/${post._id}`);
    } catch (err) {
      console.log("ERrrrrrrrrrrrrrrrrrrrrrrr" + err);
    }
  };

  const handleDelete = async (d) => {
    try {
      await axios.delete(`/comments/${d}`, {
        data: { commentId: user._id, commentName: user.username },
      });
      setToggle((prev) => !prev);
      // window.location.replace(`/post/${post._id}`);
    } catch (err) {}
  };

  useEffect(() => {
    const getComm = async () => {
      const res = await axios.get("/comments");
      setComm(res.data);
    };
    getComm();
  }, [toggle]);

  return (
    <div>
      <div className="commentsItem">
        <span className="commentsTitle">COMMENTS</span>
        <ul className="commentsList">
          {comm.map((c) => (
            <ul>
              {c.postId === post._id ? (
                <>
                  <li className="commentsGet">
                    <b>{c.username}</b>
                    {new Date(post.createdAt).toDateString()}
                    <p className="commentsIcon">
                      {c.comment}
                      {user ? (
                        <i
                          className="far fa-trash-alt"
                          onClick={(d) => handleDelete(c._id)}
                        ></i>
                      ) : (
                        console.log("You can't delete")
                      )}
                    </p>
                  </li>
                </>
              ) : (
                console.log("Not have comments")
              )}
            </ul>
          ))}
        </ul>
      </div>

      <div>
        {user ? (
          <form className="commentsText" onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Enter Comment"
              cols="30"
              rows="3"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button className="CommentsButton" type="submit">
              Post
            </button>
          </form>
        ) : (
          console.log("Login first")
        )}
      </div>
    </div>
  );
}
