import React from "react";
import { playlist } from "../data";

const Song = ({ title, artist, tile, setPlaying, index, playing }) => {
  const updatePlaying = () => {
    const temp = [];
    temp.push(playlist[index]);
    setPlaying(temp);
  };

  return (
    <div
      className={`song-${title === playing[0].title ? "active" : " "}`}
      onClick={updatePlaying}
    >
      <div className="albumArt">
        <img className="tile" src={tile}></img>
      </div>
      <div className="details">
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </div>
    </div>
  );
};

export default Song;
