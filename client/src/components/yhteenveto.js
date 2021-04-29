import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { MerchantList } from "./merchantlist";

export const Yhteenveto = ({ ButtonClick, data }) => {
  const { request } = useHttp();
  const [showForm, setShowForm] = useState("first");
  const [giftId, setGiftId] = useState();

  const giftcardDataSaving = async () => {
    try {
      const response = await request("/api/giftcard/post", "POST", data, {
        Accept: "application/json",
      });
      setGiftId(response.giftcard.cardId);
      console.log(response);
    } catch (e) {
      console.log("When data saving to db, error:", e);
    }
    setShowForm("second");
  };

  return (
    <>
      {showForm === "first" && (
        <div className="yhteenveto">
          <div className="saaja">
            <p>
              Rakas
              <span>{" " + data.nameTo + "!"}</span>
            </p>
            <p>Tässä sinulle lahjakortti MiVida Beauty studiolle!</p>
            <p>
              Lahjakortin arvo on
              <span>{" " + data.summa + " euroa."}</span>
            </p>
            <p>
              Kortti toimitetaan sähköisesti osoitteeseen
              <span>{" " + data.emailTo + "."}</span>
            </p>
            {data.message && (
              <p>
                Viestisi lähettäjältä:
                <span>{" " + data.message}</span>
              </p>
            )}
          </div>
          <div className="lahettaja">
            <p>Kortin lähettäjä:</p>
            <p>
              <span>{data.nameFrom}</span>
            </p>
            <p>Lähettäjän sähköposti:</p>
            <p>
              <span>{data.emailFrom}</span>
            </p>
          </div>
          <div>
            <button
              onClick={ButtonClick.bind(null, "second")}
              className="btn btn-primary"
            >
              Taaksepäin
            </button>
            <button onClick={giftcardDataSaving} className="btn btn-primary">
              Maksetaan
            </button>
          </div>
        </div>
      )}
      {showForm === "second" && <MerchantList giftId={giftId} />}
    </>
  );
};
