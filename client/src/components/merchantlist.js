import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

export const MerchantList = ({ giftId }) => {
  const { request } = useHttp();
  const [merchant, setMerchant] = useState([]);

  const getMerchant = async () => {
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
                  href={
                    "http://localhost:5000/create-charge/" +
                    item.selected_value +
                    "/" +
                    giftId
                  }
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
