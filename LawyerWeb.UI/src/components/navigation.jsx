import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MenuItems = [
  {
    title: 'ANASAYFA',
    path: "/",
  },
  {
    title: 'HAKKIMIZDA',
    path: "/about",
  },
  {
    title: 'EKİBİMİZ',
    path: "/team",
  },
  {
    title: 'BLOG',
    path: "/blog",
  },
  {
    title: 'İLETİŞİM',
    path: "/contact",
  }
];

const Navigation = (props) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top" ref={navRef}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            onClick={handleToggle}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to={"/"} className="navbar-brand page-scroll" onClick={handleClose}>Lawyer Web</Link>

          {user && (
            <Link to={"/admin"} >
              <Button className={"admin-navigation-button "}>
                admin
              </Button>
            </Link>)}
        </div>


        <div className={`collapse navbar-collapse ${isOpen ? "in" : ""}`} id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {MenuItems.map((item) => (
              <li className="page-scroll" key={item.path} onClick={handleClose}>
                <Link to={item.path} className={pathname === item.path ? "nav-active" : ""}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
