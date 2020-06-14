import React from "react";
import { playlist } from "../data";
import firebase from "firebase/app";
import { firestore } from "../firebase";
const db = firestore;
const Song = ({ title, artist, tile, setPlaying, index, playing, user }) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const updateCount = async (artistName) => {
    const docRef = await db.collection("users").doc(user.walletid);
    // const listened = docRef.get()
    // const userArtists =
    // docRef.update({ artist: { [artistName]: increment } });
  };

  const updatePlaying = () => {
    const temp = [];
    temp.push(playlist[index]);
    setPlaying(temp);
    updateCount(temp[0].artist[0]);
    console.log(temp[0].artist[0]);
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
