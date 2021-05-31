import React from "react";

export const GetMorePicture = ({ clickHandler }) => {
  return (
      <div className="instaMorePicture">
    <span onClick={clickHandler}>
      Lataa lisää kuvia
    </span>
    </div>
  );
};
