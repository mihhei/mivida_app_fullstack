import React, { useState, useEffect } from "react";
import axios from "axios";
import { FeedingInsta } from "./feedinginsta";
import { useHttp } from "../hooks/http.hook";

export const InstagramFetching = ({ limit }) => {
  const [feeds, setFeedsData] = useState([]);
  const { request } = useHttp();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchInstagramPost = async () => {
      try {
        const fetch = await request(`/insta/${limit}`, "GET", null);

        setFeedsData(fetch);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchInstagramPost();

    return () => {
      abortController.abort();
    };
  }, [limit, request]);

  return (
    <div className="instaGrid">
      {feeds.map((feed) => (
        <FeedingInsta key={feed.id} feed={feed} />
      ))}
    </div>
  );
};
