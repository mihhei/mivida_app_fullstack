import React, { useState } from "react";
import { Heading } from "./heading";
import { InstagramFetching } from "./instagramfetching";
import { GetMorePicture } from "./getmorepicture";

export const Block3 = () => {
  const [limit, setLimit] = useState(10);
  const increaseLimit = () => {
    setLimit((prev) => prev + 5);
  };
  return (
    <div className="block bl3" id="galleria">
      <Heading value="Galleria" />
      <InstagramFetching limit={limit} />
      <GetMorePicture clickHandler={increaseLimit} />
    </div>
  );
};
