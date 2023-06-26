import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <div className="title-group">
            <h1>Studi Independen Kampus Merdeka</h1>
            <h3>by RUANGGURU</h3>
          </div>
          <div className="vertical-line"></div>
          <div className="portal-group">
            <h1>Student Portal</h1>
            <Link to="/student">
              <Button colorScheme="blue" data-testid="student-btn">
                All Student
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
