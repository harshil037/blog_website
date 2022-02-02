import "./myblog.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Myblog() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <div className="myblog">
        {/* post */}
        <Posts posts={posts} />
        <hr className="hrr" />
        <div className="myblogSidebar">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
