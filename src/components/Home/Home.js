import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Home.css";

const Home = (props) => {
    const{name, info, image} = props.destination;
    
  return (
    <div className="home-container">
      <img className="img-style" fluid src={image} alt=""/>
  <h3 className="info">{name}</h3>

    </div>
    
  );
};

export default Home;
