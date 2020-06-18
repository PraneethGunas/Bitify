import React from "react";
// import { newContextComponents } from "@drizzle/react-components";
import { AppContext } from "./AppContext";
import MusicPlayer from "react-responsive-music-player";
import Song from "../components/Song";
import { playlist } from "../data";
import Balance from "../components/Balance";
import { Link } from "react-router-dom";

const Home = () => {
  // const { AccountData, ContractData, ContractForm } = newContextComponents;
  const { drizzleState, user } = React.useContext(AppContext);
  const freshUser = user.name ? user : JSON.parse(localStorage.getItem("user"));
  const [playing, setPlaying] = React.useState([playlist[0]]);
  const account = freshUser.walletid;
  const balance = drizzleState.accountBalances[account];
  return (
    <div className="songlist">
      <div className="head">
        <div className="logo">BITIFY</div>
        <div className="topBar">Hello {freshUser.name}</div>
        <Balance balance={balance} />
      </div>
      <div className="mid">
        <div className="Nav">
          <Link to="/transactions">
            <div className="navli">Transactions</div>
          </Link>

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
