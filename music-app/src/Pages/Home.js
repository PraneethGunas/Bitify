import React from "react";
import MusicPlayer from "react-responsive-music-player";

const Home = () => {
  const playlist = [
    {
      url: "file://home/pratyaksh_chandra/Downloads/liggi.mp3",
      cover: "hello",
      title: "Random",
      artist: ["Artist1"],
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
      cover: "hello",
      title: "Despacito",
      artist: ["Louis Fonsi"],
    },
    {
      url:
        "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
      cover: "hello",
      title: "Despacito",
      artist: ["Louis Fonsi"],
    },
  ];
  return (
    <div className="songlist">
      <div></div>
      <MusicPlayer playlist={playlist} />
    </div>
  );
};
export default Home;
