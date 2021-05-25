import React from "react";
import { Navbar } from "./navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

export const KauppaTulos = () => {
  
  const message = useParams().message;
  const returnCode = useParams().code;
  const order = useParams().order;

  const createAndDownloadPdf = () => {
    axios
      .post("/reciept/create-pdf", { order: order })
      .then(() => axios.get(`/reciept/fetch-pdf/${order}`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "reciept.pdf");
      });
  };

  return (
    <div className="block mainBackground">
      <Navbar />
      <div className="giftCard">
        <h3>LAHJAKORTTI</h3>
        {returnCode === "0" && <h5>Onnittelut!!!</h5>}
        {returnCode !== "0" && <h5>Varoitus!</h5>}
        <h6>{"Tässä tietoa lahjakortista # " + order}</h6>
        <p>{message}</p>
        <div>
          <button className="btn btn-primary" onClick={createAndDownloadPdf}>
            Get reciept
          </button>
        </div>
      </div>
    </div>
  );
};
