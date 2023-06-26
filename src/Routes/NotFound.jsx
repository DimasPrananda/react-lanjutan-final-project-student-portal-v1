import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="not-column">
        <h1>404 | Not Found</h1>
        <Button
          className="button-not"
          onClick={() => navigate(-1)}
          data-testid="back"
          colorScheme="blue"
        >
          Take me back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
