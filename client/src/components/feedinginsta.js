import React from "react";

export const FeedingInsta = (props) => {
  const { id, caption, media_type, media_url } = props.feed;
  let post;

  switch (media_type) {
    case "VIDEO":
      post = (
        <video
          width="100%"
          height="100%"
          src={media_url}
          type="video/mp4"
          controls
          playsInline
        ></video>
      );
      break;
    case "CAROUSEL_ALBUM":
      post = (
        <img width="100%" height="100%" id={id} src={media_url} alt={caption} />
      );
      break;
    default:
      post = (
        <img width="100%" height="100%" id={id} src={media_url} alt={caption} />
      );
  }

  return <React.Fragment>{post}</React.Fragment>;
};
