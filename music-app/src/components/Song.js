import React from "react";
import { playlist } from "../data";
import firebase from "firebase";
import { firestore } from "../firebase";
const db = firestore;
const Song = ({ title, artist, tile, setPlaying, index, playing, user }) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const updateCount = async (id, artistName) => {
    try {
      console.log(artistName);
      const usersRef = await db.collection("users").doc(user.walletid);
      await usersRef.update({ totalCount: increment });
      await db.collection("artists").doc(id).update({
        count: increment,
      });
      const listened = await usersRef.get();
      const artists = listened.data().artist;
      if (artists && artists[artistName]) {
        usersRef.update({
          artist: { ...artists, [artistName]: artists[artistName] + 1 },
        });
      } else {
        usersRef.update({ artist: { ...artists, [artistName]: 1 } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updatePlaying = () => {
    const temp = [];
    temp.push(playlist[index]);
    setPlaying(temp);
    updateCount(temp[0].walletid, temp[0].artist[0]);
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
