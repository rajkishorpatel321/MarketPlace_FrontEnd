import React from "react";
import "../styles/Card.css"; // Adjust the path according to your folder structure
import { useNavigate } from "react-router-dom";

const Card = ({ name, id, mandi_location }) => {
  const navigate = useNavigate();
  const handalClicke = () => {
    if (location == null) {
      const data = { id: id, name: name, mandi_location: null };
      navigate("/pricepage", { state: data });
    } else {
      const data = { id: id, name: name, mandi_location: mandi_location };
      navigate("/pricepage", { state: data });
    }
  };
  return (
    <div className="card">
      <div className="card-body" onClick={handalClicke}>
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
};
export default Card;
