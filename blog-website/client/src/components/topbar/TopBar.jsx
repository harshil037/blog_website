import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link" to="/">
          <i>BLOG WEBSITE</i>
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            {user ? (
              <Link className="link" to={`/myblog/?user=${user.username}`}>
                MY BLOG
              </Link>
            ) : (
              <Link className="link" to="/login">
                MY BLOG
              </Link>
            )}
          </li>

          <li className="topListItem">
            {user ? (
              <Link className="link" to="/write">
                CREATE BLOG
              </Link>
            ) : (
              <Link className="link" to="/login">
                CREATE BLOG
              </Link>
            )}
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            {user.profilePic ? (
              <img className="topImg" src={PF + user.profilePic} alt="" />
            ) : (
              <img
                className="topImg"
                src="https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag="
                alt=""
              />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {user ? (
          <Link to={`/?user=${user.username}`} className="link">
            <p className="topListUname">{user.username}</p>
          </Link>
        ) : (
          console.log("NO user")
        )}
      </div>
    </div>
  );
}
