import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import './Music.css';
import SessionHelper from '../helpers/SessionHelper';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from 'axios';
import redLogo from '../styles/artberry_red.png';
import whiteLogo from '../styles/artberry_white.png';
import * as sessionService from '../services/SessionService';
import userIcon from '../styles/user.png';
const Music = (props) => {

  const navigate = useNavigate();
  
  const[redSong, setRedSong] = useState('');
  const[whiteSong, setWhiteSong] = useState('');

  const redPlayer = useRef();
  const whitePlayer = useRef();

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {   
      navigate('../login');
    }else{
      sessionService.chechSession().then(result => {
        if(result && result.data){
          if(!result.data){
            SessionHelper.clearSession();
            localStorage.setItem('expired', '1');
            navigate('../login');
          }else{

            setInterval(() => {
              sessionService.chechSession().then(result => {
                if(result && result.data){
                  console.log('check session:' + result.data)
                  if(!result.data){
                    SessionHelper.clearSession();
                    localStorage.setItem('expired', '1');
                    navigate('../login');
                  }
                }
              })
            }, 120000);

          }
        }
      })
    }


  }, []);


  const getSong = (radio) => {

    let radioUrl = 'http://213.232.88.19:8334/currentsong?sid=1';
    if(radio === 0){
      radioUrl = 'http://213.232.88.19:8234/currentsong?sid=1';
    }

    axios.get(radioUrl).then(result => {
      console.log(result)
    });
  }

  const logoClick = () => {
    navigate('../')
  }

  const playRed = () => {
    whitePlayer.current.audio.current.pause();

    getSong(1)
  }

  const playWhite = () => {
    redPlayer.current.audio.current.pause();
  }

  const userIconClick = () => {
    navigate('../user');
  }

  return (
    <div className='music-page'>
 
      <div className='music-menu-bottom'>
        <img src={logo} alt="logo" className='logo-left' onClick={logoClick} />
        
        <div className='music-menu-right'>
          <Link to="../">Начало</Link> <Link to="/music">Слушай</Link> <img src={userIcon} alt="img" className='user-icon' onClick={userIconClick} /> <Link to="/logout">Изход</Link>  
        </div>
       
      </div>
      <div className='sub-text'>
        Просто слушайте…
      </div>
      <div className='radios-div'>
        <br />
        <div className='red-player-div'>
          <img src={redLogo} alt='red' className='radio-icon' />
          <AudioPlayer
            className="red-player"
            src="https://stream.artberry.eu:444"
            style={{ borderRadius: "1rem", width: '30%', marginLeft: '20%', position: 'absolute', top: '725px' }}
            showJumpControls={false}
            layout="stacked"
            customProgressBarSection={["CURRENT_TIME", "PROGRESS_BAR"]}
            customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
            autoPlayAfterSrcChange={false}
            header= {redSong}
            onPlay={playRed}
            ref={redPlayer}
          />
        </div>

        <br />

        <div className='white-player-div'>
          <img src={whiteLogo} alt='white' className='radio-icon' />
          <AudioPlayer
            className="white-player"
            src="https://stream.artberry.eu:443"
            style={{ borderRadius: "1rem", width: '30%', marginLeft: '20%', position: 'absolute', top: '1465px' }}
            showJumpControls={false}
            layout="stacked"
            customProgressBarSection={["CURRENT_TIME", "PROGRESS_BAR"]}
            customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
            autoPlayAfterSrcChange={false}
            header= {whiteSong}
            onPlay={playWhite}
            ref={whitePlayer}
          />
        </div>

      </div>

      <Footer top={150} />
    </div>
  );
};

export default Music;