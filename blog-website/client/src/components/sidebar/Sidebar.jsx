import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [cate, setCate] = useState("");
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [toggle, setToggle] = useState(false);

  //add new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCate = {
      userId: user._id,
      cate,
    };

    try {
      await axios.post("/categories", newCate);
      // window.location.replace("/");
      setToggle((prev) => !prev);
    } catch (err) {
      console.log("EEEEEERRRRRRRRRRRRRR" + err);
    }
  };
  //

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, [toggle]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        {user ? (
          <>
            {user.profilePic ? (
              <img src={PF + user.profilePic} alt="" />
            ) : (
              <img
                src="https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag="
                alt=""
              />
            )}
          </>
        ) : (
          <img
            src="https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418__480.jpg"
            alt=""
          />
        )}
        {user ? (
          <p>{user.username}</p>
        ) : (
          <p>
            This Project is designed for the “Blogging”. This is
            web-application, which provides facilities such as login/register
            into the system, add blog post with title, description and image and
            edit or delete the blog post and also can comment.
          </p>
        )}
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle st1">CATEGORIES</span>
        {user ? (
          <ul className="sidebarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.cate}`} className="link">
                {user._id === c.userId ? (
                  <li className="sidebarListItem">{c.cate}</li>
                ) : (
                  console.log("Not have category")
                )}
              </Link>
            ))}
          </ul>
        ) : (
          <ul className="sidebarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.cate}`} className="link">
                <li className="sidebarListItem">{c.cate}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category"
            className="addCategory"
            onChange={(e) => setCate(e.target.value)}
          />
          <button className="addButton" type="submit">
            Add
          </button>
        </form>
      ) : (
        console.log("You have to login first")
      )}
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
