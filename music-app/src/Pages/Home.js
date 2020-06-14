import React, { useState } from "react";
import MusicPlayer from "react-responsive-music-player";
import Song from "../components/Song";
import { playlist } from "../data";
import Balance from "../components/Balance";

const Home = () => {
  const [playing, setPlaying] = useState([playlist[0]]);

  return (
    <div className="songlist">
      <div className="head">
        <div className="logo">BITTIFY</div>
        <div className="topBar">Hello Pratyaksh !</div>
        <Balance />
      </div>
      <div className="mid">
        <div className="Nav">
          <div className="navli">Transactions</div>
          <div className="navli">Calculator</div>
          <div className="navli">Profile</div>
        </div>
        <div className="list">
          {playlist.map((song, index) => (
            <Song
              key={index}
              title={song.title}
              artist={song.artist}
              tile={song.cover}
              key={index}
              playing={playing}
              setPlaying={setPlaying}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="playerDiv">
        <MusicPlayer
          playlist={playing}
          width={"100%"}
          autoplay={true}
          progressColor={"#f98e1d"}
        />
      </div>
    </div>
  );
};
export default Home;
