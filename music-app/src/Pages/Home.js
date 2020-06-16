import React from "react";
// import { newContextComponents } from "@drizzle/react-components";
import { AppContext } from "./AppContext";
import MusicPlayer from "react-responsive-music-player";
import Song from "../components/Song";
import { playlist } from "../data";
import Balance from "../components/Balance";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "../firebase";
const db = firestore;
const Home = () => {
  // const { AccountData, ContractData, ContractForm } = newContextComponents;
  const { drizzleState, user, drizzle } = React.useContext(AppContext);
  const freshUser = user.name ? user : JSON.parse(localStorage.getItem("user"));
  const [playing, setPlaying] = React.useState([playlist[0]]);
  const account = freshUser.walletid;
  const balance = drizzleState.accountBalances[account];
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.replace("/login");
  };
  const distribute = async () => {
    const activeUsers = await getActiveUsers();
    const distributionMap = calculateDistributions(activeUsers);
    const artistIDs = await getArtistsID();
    const distributedArray = await getParams(artistIDs, distributionMap);
    collectorTransact(distributedArray);
  };
  const getActiveUsers = async () => {
    const activeUsers = [];
    const users = await db
      .collection("users")
      .where("totalCount", ">", 0)
      .get();
    users.forEach((doc) => {
      activeUsers.push(doc.data());
    });
    return activeUsers;
  };
  const calculateDistributions = (AUs) => {
    if (!AUs.length) {
      alert("No activity yet!");
      return;
    }
    const distubutionMap = {};
    AUs.map((item) => {
      const { totalCount } = item;
      const USER_POOL = 100;
      Object.keys(item.artist).map((name) => {
        distubutionMap[name] = distubutionMap[name]
          ? distubutionMap[name] + (item.artist[name] / totalCount) * USER_POOL
          : (item.artist[name] / totalCount) * USER_POOL;
      });
    });
    return distubutionMap;
  };
  const getArtistsID = async () => {
    const artistsID = {};
    const artists = await db.collection("artists").get();
    artists.forEach((doc) => {
      artistsID[[doc.data().name]] = doc.id;
    });
    return artistsID;
  };
  const getParams = (AIDs, DM) => {
    if (!DM) {
      return;
    }
    const map = {};
    Object.keys(AIDs).map((key) => {
      map[AIDs[key]] = DM[key];
    });
    return map;
  };
  const collectorTransact = async (ArtistDistribution) => {
    // call Contract here
  };
  return (
    <div className="songlist">
      <div className="head">
        <div className="logo">BITTIFY</div>
        <div className="topBar">Hello {freshUser.name}</div>
        {/* <Balance balance={balance} /> */}
      </div>
      <div className="mid">
        <div className="Nav">
          <Link to="/transactions">
            <div className="navli">Transactions</div>
          </Link>
          <div className="navli">Calculator</div>
          <div className="navli">Profile</div>
          <div className="navli" onClick={logout}>
            Logout
          </div>
          <div className="navli" onClick={distribute}>
            Distribute
          </div>
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
              user={freshUser}
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
