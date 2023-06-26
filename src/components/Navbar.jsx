import React from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link as={RouterLink} to="/" className="navbar-title">
        <h1 data-testid="home-page">Student Portal</h1>
      </Link>
      <div className="navbar-group">
        <Link as={RouterLink} to="/student">
          <button className="button-navbar" data-testid="student-page">
            All Students
          </button>
        </Link>
        <Link as={RouterLink} to="/add">
          <button className="button-navbar" data-testid="add-page">
            Add Student
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
