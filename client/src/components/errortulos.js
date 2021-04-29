import React from "react";
import { Navbar } from "./navbar";
import { useParams } from "react-router-dom";

export const ErrorTulos = () => {
  const message = useParams().message;

  return (
    <div className="block mainBackground">
      <Navbar />
      <div className="giftCard">
        <h3>LAHJAKORTTI</h3>
        <h5>Varoitus!</h5>
        <p>Maksusi ei voitu tarkistaa, ota yheyttä myyjään!</p>
        <p>{message}</p>
      </div>
    </div>
  );
};
