import React, { useState } from 'react';
import level1 from '../images/level-1.jpg';
import waldo from '../images/waldo.jpg';
import odlaw from '../images/odlaw.jpg';
import wizard from '../images/wizard.jpg';
import { db } from '../config/firebase.js';
import { collection, getDocs,addDoc } from 'firebase/firestore';
import { Link, NavLink } from 'react-router-dom';
function GameComponent() {
    const [foundWaldo, setFoundWaldo] = useState(false);
    const [foundOdlaw, setFoundOdlaw] = useState(false);
    const [foundWizard, setFoundWizard] = useState(false);
    const [time, setTime] = useState(0);
    const [userName,setUserName] = useState('')
    const timer =  setTimeout(() => {
        setTime(time + 1);
    }, 1000);
    const getWaldoCoordinates = async () => {
        const collectionRef = collection(db, 'waldo-coordinates');
        try {
            const data = await getDocs(collectionRef);
            const processedData = data.docs.map((item) => {
                return item.data();
            });
            return processedData
        } catch (err) {
            console.log(err);
        }
    }
    const getOdlawCoordinates = async () => {
        const collectionRef = collection(db, 'odlaw-coordinates');
        try {
            const data = await getDocs(collectionRef);
            const processedData = data.docs.map((item) => {
                return item.data();
            });
            return processedData
        } catch (err) {
            console.log(err);
        }
    }
    const getWizardCoordinates = async () => {
        const collectionRef = collection(db, 'wizard-coordinates');
        try {
            const data = await getDocs(collectionRef);
            const processedData = data.docs.map((item) => {
                return item.data();
            });
            return processedData
        } catch (err) {
            console.log(err);
        }
    }
    function isGameOver() {
        if (foundWaldo === true && foundOdlaw === true && foundWizard === true) {
            return true;
        }
        else {
            return false
        }
    }
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function GetCoordinates(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        setX(x);
        setY(y);
        return [x, y];
    }
    function getMousePointer(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let floating = document.querySelector('.floating-card');
        floating.style.left = `${x}px`
        floating.style.top = `${y}px`
    }
    function logrith() {
        const floatingCard = document.querySelector('.floating-card');
        floatingCard.style.display = 'flex';
    }
    const selectWaldo = async (e) => {
        e.stopPropagation();
        const character_one = document.querySelector('.character-one');
        const floatingCard = document.querySelector('.floating-card');
        floatingCard.style.display = 'none';
        const Coordinates = [x, y];
        const waldo = await getWaldoCoordinates();
        console.log(waldo);
        if (Coordinates[0] > waldo[0].min_X && Coordinates[1] > waldo[0].min_Y && Coordinates[0] < waldo[0].max_X && Coordinates[1] < waldo[0].max_Y) {
            setFoundWaldo(true);
            character_one.style.opacity = '0.3';
        }
    }
    const selectOdlaw = async (e) => {
        e.stopPropagation();
        const character_two = document.querySelector('.character-two');
        const floatingCard = document.querySelector('.floating-card');
        floatingCard.style.display = 'none';
        const Coordinates = [x, y];
        const odlaw = await getOdlawCoordinates();
        if (Coordinates[0] > odlaw[0].min_X && Coordinates[1] > odlaw[0].min_Y && Coordinates[0] < odlaw[0].max_X && Coordinates[1] < odlaw[0].max_Y) {
            setFoundOdlaw(true);
            character_two.style.opacity = '0.3';
        }
    }
    const selectWizard = async (e) => {
        e.stopPropagation();
        const character_three = document.querySelector('.character-three')
        const floatingCard = document.querySelector('.floating-card');
        floatingCard.style.display = 'none';
        const Coordinates = [x, y];
        const wizard = await getWizardCoordinates();
        if (Coordinates[0] > wizard[0].min_X && Coordinates[1] > wizard[0].min_Y && Coordinates[0] < wizard[0].max_X && Coordinates[1] < wizard[0].max_Y) {
            setFoundWizard(true);
            character_three.style.opacity = '0.3';
        }
    }
    const collectionRef = collection(db, 'Highscores');
    const uploadHighscore = async()=>{
        try {
            addDoc(collectionRef, {
                name: userName,
                time: time
            }).then(alert('successfully added'))
        } catch (err) {
            alert(err);
        }
    }
    const handleUserName = (e)=>{
        setUserName(e.target.value);
    }
    if (isGameOver() === false) {
        return (
            <div className='container' onClick={getMousePointer}>
                <nav>
                    <div className='characters-container'>
                        <img src={waldo} alt="waldo" className='character-one' />
                        <img src={odlaw} alt="odlaw" className='character-two' />
                        <img src={wizard} alt="wizard" className='character-three' />
                    </div>
                    <Link to={'/'}>
                        <button className='homeBtn'>Return Home</button>
                    </Link>
                    <div className='homeBtn'>time : {time}</div>
                </nav>
                <div className='background-picture' onClick={logrith}>
                    <img src={level1} className='img' onClick={GetCoordinates} />
                    <div className='floating-card'>
                        <div className='waldo' onClick={selectWaldo}>
                            <img src={waldo} alt="waldo" />
                            <div>Waldo</div>
                        </div>
                        <div className='odlaw' onClick={selectOdlaw}>
                            <img src={odlaw} alt="odlaw" />
                            <div>Odlaw</div>
                        </div>
                        <div className='wizard' onClick={selectWizard}>
                            <img src={wizard} alt="wizard" />
                            <div>Wizard</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        clearTimeout(timer);
        return (
            <div className='leaderboard-form'>
                <div className='char1'>Congratulations, you found all characters</div>
                <div className='char2'>Input your name to be placed in the leaderboard</div>
                <div>
                    <form>
                        <label htmlFor="">Enter your username</label>
                        <input type="text" value={userName} onChange={handleUserName} />
                    </form>
                </div>
                <div>Time : {time}s</div>
                <NavLink to={'/leaderBoards'}>
                    <button className='submitBtn' onClick={uploadHighscore}>Submit</button>
                </NavLink>
            </div>
        )
    }
}
export default GameComponent;
