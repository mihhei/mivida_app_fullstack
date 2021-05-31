import React, { useState, useEffect } from "react";
import { FeedingInsta } from "./feedinginsta";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./loader";

export const InstagramFetching = ({ limit }) => {
  const [feeds, setFeedsData] = useState();
  const { request } = useHttp();

  useEffect(() => {
    const fetchInstagramPost = async () => {
      try {
        const fetch = await request(`/insta/${limit}`, "GET", null);
        console.log(fetch);
        setFeedsData(fetch);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchInstagramPost();
  }, [limit, request]);

  return (
    <>
      {feeds && (
        <div className="instaGrid">
          {feeds.map((feed) => (
            <FeedingInsta key={feed.id} feed={feed} />
          ))}
        </div>
      )}
      {!feeds && <Loader />}
    </>
  );
};
