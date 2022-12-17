import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import userIcon from '../styles/user.png';
import './UserPage.css'
import * as utilsService from '../services/UtilsService';
import SessionHelper from '../helpers/SessionHelper';
import { loginTexts, registerTexts } from '../texts';

const UserPage = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState({});
  const [email, setEmail] = useState('');
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {
      navigate('../login')
    } else {
      utilsService.getUserBySession().then(result => {
        if (result && result.data) {
          setUser(result.data.user);
          setEmail(result.data.user.email)
          setSubscription(result.data.subscription);
        }
      }).catch(error => {
        SessionHelper.clearSession();
        navigate('../login', { replace: true })
      })
    }
    document.removeEventListener('contextmenu', utilsService.handelRightClick);
  }, []);

  const userIconClick = () => {
    navigate('../user');
  }

  const logoClick = () => {
    navigate('../')
  }

  const updateEmailClick = () => {

    if (!email) {
      setEmailErrorMsg(loginTexts.noUsername);
      return;
    } else if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+\.[A-Za-z]+$/.test(email)) {
      setEmailErrorMsg(loginTexts.invalidEmail);
      return;
    } else {

      let model = { id: user.id, email: email };

      utilsService.changeEmail(model).then(result => {
        if (result && result.data) {
          setEmailErrorMsg('');
          setEmailSuccessMsg(registerTexts.editSuccess);
          let obj = user;
          obj.email = email;
          setUser(obj);
        }
      }).catch(error => {
        setEmailErrorMsg(registerTexts.error)
      })
    }
  }

  const updatePasswordClick = () => {
    if (password === '' || newPassword === '') {
      setPasswordErrorMsg(loginTexts.noPassword);
      return;
    }
    if (password === newPassword) {
      setPasswordErrorMsg(registerTexts.matchingPassword);
      return;
    }

    if (password.length < 6 || newPassword < 6) {
      setPasswordErrorMsg(loginTexts.shortPassword);
      return;
    }

    let model = { id: user.id, password: password, newPassword: newPassword };

     utilsService.changePassword(model).then(result => {
       if (result && result.data) {
         setPasswordErrorMsg('');
         setPasswordSuccessMsg(registerTexts.editSuccess);
       }
     }).catch(error => {
       setPasswordErrorMsg(registerTexts.error)
     })

  };

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
      <div className='user-div'>
        <div className='user-info'>
          <label>Username</label>
          <input className='user-input' type='text' disabled={true} value={user.name} />
          <br />
          <label>Email</label>
          <input className='user-input user-email' type='text'
            onChange={event => setEmail(event?.target?.value)}
            value={email}
          />
          <button className='email-update-btn' disabled={email === user.email} onClick={updateEmailClick}>Update</button>
          <span className='error-msg'>{emailErrorMsg}</span>
          <span className='success-msg'>{emailSuccessMsg}</span>
          <br />

          <label>Password</label>
          <input className='user-input password-input' type='text'
            onChange={event => setPassword(event?.target?.value)}
            value={password}
          />

          <br />
          <label>New Password</label>
          <input className='user-input new-password-input' type='text'
            onChange={event => setNewPassword(event?.target?.value)}
            value={newPassword}
          />

          <button className='password-update-btn' disabled={password === '' || newPassword === ''} onClick={updatePasswordClick}>Change Password</button>
          <br />
          <br />
          <span className='error-msg'>{passwordErrorMsg}</span>
          <span className='success-msg'>{passwordSuccessMsg}</span>

        </div>

        <div className='subscription-info'>
          {
            subscription ?
              (<table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Duration</td>
                    <td>Price</td>
                    <td>Number of sessions</td>
                    <td>Start</td>
                    <td>End</td>
                  </tr>
                  <tr>
                    <td>{subscription.name}</td>
                    <td>{subscription.monthsDuration}</td>
                    <td>{subscription.price}</td>
                    <td>{subscription.sessionsNumber}</td>
                    <td>{user.subscriptionStart ? user.subscriptionStart.split('T')[0] : ''}</td>
                    <td>{user.subscriptionEnd ? user.subscriptionEnd.split('T')[0] : ''}</td>
                  </tr>
                </tbody>
              </table>)
              : ''
          }
        </div>
      </div>



      <Footer top={820} />
    </div>
  );
};

export default UserPage;