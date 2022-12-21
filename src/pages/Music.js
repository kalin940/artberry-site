import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import './Music.css';
import SessionHelper from '../helpers/SessionHelper';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import redLogo from '../styles/artberry_red.png';
import whiteLogo from '../styles/artberry_white.png';
import * as sessionService from '../services/SessionService';
import * as utilsService from '../services/UtilsService';
import userIcon from '../styles/user.png';
import axios from 'axios';

const Music = (props) => {

  const navigate = useNavigate();
  
  const[redSong, setRedSong] = useState('');
  const[whiteSong, setWhiteSong] = useState('');
  
  const redPlaying = useRef(false);
  const whitePlaying = useRef(false);

  const redPlayer = useRef();
  const whitePlayer = useRef();

  useEffect(() => {
   
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {   
      navigate('../login');
    }else{
      
      sessionService.chechSession().then(result => {
          if(!result.data){
            SessionHelper.clearSession();
            localStorage.setItem('expired', '1');
            navigate('../login');
          }else{
            utilsService.getRedLog();
            redPlayer.current.audio.current.play();
            setInterval(() => {
              sessionService.chechSession().then(result => {
                if(result && result.data === false){
                    SessionHelper.clearSession();
                    localStorage.setItem('expired', '1');
                    navigate('../login');
                }
              })
            }, 70000);

          }     
      })

      document.addEventListener('contextmenu', utilsService.handelRightClick);
    }

    

    window.addEventListener('offline', (e) => { 
 
    });

    window.addEventListener('online', (e) => {
       if(redPlaying.current ){
           redPlayer.current.audio.current.src = ''
           redPlayer.current.audio.current.src = 'https://stream.artberry.eu:444'
           redPlayer.current.audio.current.play();
       }
       if(whitePlaying.current){
           whitePlayer.current.audio.current.src = ''
           whitePlayer.current.audio.current.src = 'https://stream.artberry.eu:443'
           whitePlayer.current.audio.current.play();
       }
    });
   
  }, []);

  const onPlayError = (error) => {
     if(redPlaying.current){
         redPlayer.current.audio.current.src = ''
         redPlayer.current.audio.current.src = 'https://stream.artberry.eu:444'
         redPlayer.current.audio.current.play();
     }
     if(whitePlaying.current){
         whitePlayer.current.audio.current.src = ''
         whitePlayer.current.audio.current.src = 'https://stream.artberry.eu:443'
         whitePlayer.current.audio.current.play();
     }
  }

   const getSong = (radio) => {

     let radioUrl = 'http://213.232.88.19:8334/currentsong?sid=1';
     if(radio === 0){
       radioUrl = 'http://213.232.88.19:8234/currentsong?sid=1';
     }

     axios.get(radioUrl).then(result => {
       console.log(result)
     }).error(error => {
      console.log(error)
     });
   }

  const logoClick = () => {
    navigate('../')
  }

  const playRed = () => {

    redPlaying.current = true;
    whitePlaying.current = false;

    whitePlayer.current.audio.current.pause();

    utilsService.getRedLog();

    getSong();
  }

  const playWhite = () => {
   
    redPlaying.current = false;
    whitePlaying.current = true;

    redPlayer.current.audio.current.pause();

    utilsService.getWhiteLog();
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
            onPlay={playRed}
            onPlayError={onPlayError}
            // onWaiting={waitingRedEvent}
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
            // onWaiting={waitingWhiteEvent}
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