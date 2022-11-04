import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import wallpaper from '../styles/wallpaper.png';
import logo from '../styles/air_artbbery_m.png';
import SessionHelper from '../helpers/SessionHelper';
import * as sessionService from '../services/SessionService';
import { loginTexts } from '../texts';
import './Login.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMsg] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId !== null && sessionId !== undefined && sessionId !== '') {
      navigate('../', { replace: true })
    }

    //Check session
    if(true){
      
    }

  }, []);


  const logoClick = () => { 
    navigate('../', { replace: true })
  }
  
  const handleOnClick = (event) => {
    event.preventDefault();
    setDisableButton(true);
    let validUsername = false;
    let validPassword = false;
    //validation

    if (!username) {
      setErrorMsg(loginTexts.noUsername);
    } else if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+\.[A-Za-z]+$/.test(username)) {
      setErrorMsg(loginTexts.invalidEmail);
    } else {
      validUsername = true;
    }

    if (!password) {
      setErrorMsg(loginTexts.noPassword);
    } else if (password.length < 6) {
      setErrorMsg(loginTexts.shortPassword);
    // } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
    //   setErrorMsg(loginTexts.simplePassword);
    // }
    }else {
      validPassword = true;
    }

    if (!validPassword || !validUsername) {
      setDisableButton(false);
      return;
    }

    let credentials = { Email: username, Password: password, ApplicationType: 0};
    //api call
    let res = login(credentials);

    res.then(function (response) {
      console.log(response);
        if(response && response.data){
            SessionHelper.setSession(response.data.id);
            setErrorMsg('');
            navigate('../music', { replace: true })
        }
      }).catch(function (error) {
        setDisableButton(false);
        setErrorMsg(loginTexts.invalidCredentials);
      })
  }

  const login = async (data) => {
    return await sessionService.getSession(data);
  }


  return (
    <div className='login-page'>

      <div className='login-container'>


        <img src={logo} alt="logo" className='login-logo' onClick={logoClick} />

        <div className='login-form'>
          <label>Username</label>
          <input className='login-input' type='text' placeholder=''
            onChange={event => setUsername(event?.target?.value)}
            value={username}
          />
          <br />
          <br />
          <label>Password</label>
          <input className='login-input' type='password' placeholder=''
            onChange={event => setPassword(event?.target?.value)}
            value={password}
          />

          <button type='submit' className='login-btn' disabled={disableButton}  onClick={e => handleOnClick(e)}>Log in</button>
        
          <div className="error-message">{errorMessage}</div>
        </div>
        <br />
        <Link className='login-link' to="/forgotten-password" >Lost your password?</Link>
        <br />
        <br />
        <Link className='login-link' to="/" >← Go to Air Artberry</Link>

        <div className='info-login'>
        One account can only be used by one device at a time.
        </div>
      </div>
      <div className='half-wallpaper' backgr>
        <img src={wallpaper} alt="wallpaper" className='half-wallpaper-img' />
      </div>
    </div>
  );
};

export default Login;