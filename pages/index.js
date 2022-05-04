import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
import Navbar from "../components/Navbar";
import { useState } from "react";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        id
        title
        description
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "cl2ozo752qt1r0cukuqj7r4j4" }) {
        username
        avatar {
          id
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const getRandomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const getVideosByGenres = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const getSeenVideos = (videos) => {
    return videos.filter((video) => video.seen === false || video.seen == null);
  };

  const selectedVideo = getRandomVideo(videos);
  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img src={selectedVideo.thumbnail.url} alt={selectedVideo.title} />
        </div>
      </div>
      <div className="video-feed">
        <Section genre={"Recommended for you"} videos={getSeenVideos(videos)} />
        <Section genre={"Drama"} videos={getVideosByGenres(videos, "Drama")} />
        <Section
          genre={"Fantasy"}
          videos={getVideosByGenres(videos, "Fantasy")}
        />
        <Section
          genre={"Horror"}
          videos={getVideosByGenres(videos, "Horror")}
        />
        <Section
          genre={"Animation"}
          videos={getVideosByGenres(videos, "Animation")}
        />
        <Section
          genre={"Comedy"}
          videos={getVideosByGenres(videos, "Comedy")}
        />
        <Section
          genre={"Romance"}
          videos={getVideosByGenres(videos, "Romance")}
        />
        <Section genre={"Sport"} videos={getVideosByGenres(videos, "Sport")} />
        <Section genre={"Crime"} videos={getVideosByGenres(videos, "Crime")} />
        <Section
          genre={"Action"}
          videos={getVideosByGenres(videos, "Action")}
        />
        <Section
          genre={"Adventure"}
          videos={getVideosByGenres(videos, "Adventure")}
        />
        <Section
          genre={"Biography"}
          videos={getVideosByGenres(videos, "Biography")}
        />
      </div>
    </>
  );
};

export default Home;
