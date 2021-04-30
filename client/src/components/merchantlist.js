import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

export const MerchantList = ({ giftId }) => {
  const SERVER_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://mivida-app.herokuapp.com";

  const { request } = useHttp();
  const [merchant, setMerchant] = useState([]);

  const getMerchant = async () => {
    console.log("server url", SERVER_URL, process.env.NODE_ENV);
    try {
      const fetch = await request(
        "/api/giftcard/get-merchant-payment-methods",
        "GET",
        null
      );
      setMerchant(fetch);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMerchant();
  }, []);

  if (giftId) {
    return (
      <div className="container">
        <h5>Valitse sopiva maksutapa!</h5>
        <div className="merchantList">
          {merchant.map((item, index) => {
            return (
              <div className="merchantItem" key={index}>
                <a
                  href={`${SERVER_URL}/create-charge/${item.selected_value}/${giftId}`}
                >
                  <img src={item.img} alt="item" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <h3>
        Valitettavasti tällä kerta kauppa ei onnistuu teknisen ongelman takia,
        kokeile myöhemmin!
      </h3>
    );
  }
};
