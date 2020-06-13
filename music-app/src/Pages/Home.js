import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { AppContext } from "./AppContext";
import MusicPlayer from "react-responsive-music-player";
import Song from "../components/Song";
import { playlist } from "../data";

const Home = () => {
  // const { AccountData, ContractData, ContractForm } = newContextComponents;
  const { drizzle, drizzleState, user } = React.useContext(AppContext);
  const account = user.id;
  const [playing, setPlaying] = React.useState([playlist[0]]);
  const balance = drizzleState.accountBalances[account];
  return (
    <div className="songlist">
      <div className="head">
        <div className="logo">BITTIFY</div>
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
