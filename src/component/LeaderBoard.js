import React, { useEffect } from "react";
import { db } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { NavLink } from "react-router-dom";
function LeaderBoard() {
  const [highScore, setHighScore] = useState([]);
  const collectionRef = collection(db, "Highscores");
  const readData = async () => {
    try {
      const data = await getDocs(collectionRef);
      let processedData = data.docs.map((item) => {
        return item.data();
      });
      setHighScore(processedData);
      return processedData;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    readData();
  }, []);

  return (
    <div className="highscoreContainer">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <button className="homeBtn">Home</button>
      </NavLink>
      <h1 className="heading">Highscores</h1>
      {highScore.map((item, index) => {
        if (index === 0) {
          return <div> </div>;
        }
        return (
          <div className="items">
            <div>{index} </div>
            <div>Name : {item.name},</div>
            <div>Time : {item.time}s</div>
          </div>
        );
      })}
    </div>
  );
}
export default LeaderBoard;
