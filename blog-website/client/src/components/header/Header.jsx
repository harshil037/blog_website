import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        {/* <span className="headerTitleSm">React & Node</span> */}
        {/* <span className="headerTitleLg">Blog</span> */}
      </div>
      <img
        className="headerImg"
        src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/16114435/iStock-6895760421.jpg"
        alt=""
      />
    </div>
  );
}
