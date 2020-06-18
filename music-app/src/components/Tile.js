import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
const db = firestore;
const Tile = ({ name, views, cover }) => {
  const getViews = async () => {
    const artists = await db
      .collection("artists")
      .where("name", "==", name)
      .get();
    artists.forEach((doc) => {
      setView(doc.data().count);
    });
  };
  useEffect(() => {
    getViews();
  }, []);
  const [view, setView] = useState(0);
  return (
    <div className="tileart">
      <div className="imgcon">
        <img src={cover}></img>
      </div>
      <div className="info">
        <div className="name">{name}</div>
        <div className="name">View Count {view}</div>
        <div className="views"></div>
      </div>
    </div>
  );
};

export default Tile;
