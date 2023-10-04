import React from "react";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div className="homeContainer">
      <div>Where's Waldo</div>
      <NavLink
        to={"level1"}
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <button className="startGame">Start game</button>
      </NavLink>
      <NavLink
        to={"leaderBoards"}
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <button className="checkLeaderBoard">Leaderboard</button>
      </NavLink>
    </div>
  );
}
export default Home;
