import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import GameComponent from './GameComponent';
import LeaderBoard from './LeaderBoard';
function RouterSwitch() {
        return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" index element={<Home/>}/>
                    <Route path="level1" element={<GameComponent/>}/>
                    <Route path="leaderBoards" element={<LeaderBoard />} />
            </Routes>
        </BrowserRouter>
    );
}
export default RouterSwitch
