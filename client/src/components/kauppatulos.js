import React from "react";
import { Navbar } from "./navbar";
import { useParams } from "react-router-dom";

export const KauppaTulos = () => {
  const message = useParams().message;
  const returnCode = useParams().code;
  const order = useParams().order;
  
  return (
    <div className="block mainBackground">
      <Navbar />
      <div className="giftCard">
        <h3>LAHJAKORTTI</h3>
        {returnCode === "0" && <h5>Onnittelut!!!</h5>}
        {returnCode !== "0" && <h5>Varoitus!</h5>}
        <h6>{'Tässä tietoa lahjakortista # '+ order}</h6>
        <p>{message}</p>
      </div>
    </div>
  );
};
