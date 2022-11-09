import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import SessionHelper from '../helpers/SessionHelper';
import UserList from '../components/UserList';
import './Admin.css';
import * as sessionService from '../services/SessionService';
import * as utilsService from '../services/UtilsService';
import { registerTexts } from '../texts';
import userIcon from '../styles/user.png';

const Admin = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [reload, setReload] = useState(false);
  const [subscription, setSubscription] = useState(0);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {
      navigate('../login')
    }

    //Check session
    sessionService.chechAdminSession().then(result => {
        if(result && result.data){
          utilsService.getSubscriptions().then(result => {
            if(result && result.data){
              result.data.unshift({id:0, name:'None'})
              setSubscriptionList(result.data)
            }
          });
        }else{
          SessionHelper.clearSession();
          navigate('../login')
        }
    })

  }, []);

  const logoClick = () => {
    navigate('../', { replace: true })
  }

  const handleSubChange = (e) => {
    setSubscription(e.target.value);
  };

  const registerClick = () => {
      let user = {};
      user.name = username;
      user.password = password;
      user.email = email;
      user.isAdmin = isAdmin;
      user.subscriptionId = subscription === 0 ? null : subscription;
      user.isSubscriptionEnabled = subscription === 0 ? false : true;
      
      utilsService.registerUser(user).then(result => {
         setRegisterSuccessMsg(registerTexts.success);   
         setUsername('');
         setPassword('');
         setEmail('');
         setIsAdmin(false);
         
         setTimeout(() => {
            setReload(true);
            setRegisterSuccessMsg('');   
          }, "5000")
      }).catch(error => {
        setRegisterErrorMsg(error.response.data ? error.response.data : registerTexts.error);   
        setTimeout(() => {
        setRegisterErrorMsg('');   
        }, "15000")
      });
  }

  const userIconClick = () => {
    navigate('../user');
  }


  return (
    <div className='music-page'>

      <div className='music-menu-bottom'>
        <img src={logo} alt="logo" className='logo-left' onClick={logoClick} />
        <div className='admin-menu-right'>
          <Link to="../">Начало</Link> <Link to="/music">Слушай</Link> <img src={userIcon} alt="img" className='user-icon' onClick={userIconClick}/> 
          <Link to="/logout">Изход</Link>
        </div>
      </div>

      <div className='create-user-form'>
         <h5>Register user</h5>
          <label>Username</label>
          <input className='login-input' type='text' placeholder=''
            onChange={event => setUsername(event?.target?.value)}
            value={username}
          />
          <br/>
          <label>Email</label>
          <input className='login-input' type='text' placeholder=''
            onChange={event => setEmail(event?.target?.value)}
            value={email}
          />
          <br/>
          <label>Password</label>
          <input className='login-input' type='text' placeholder=''
            onChange={event => setPassword(event?.target?.value)}
            value={password}
          /> 
          <br/>
          <label>Is Admin?</label>
          <input className='login-input' type='checkbox'
            onChange={event => setIsAdmin(!isAdmin)}
            value={isAdmin}
          />
          <br/>
          <label>Subscription</label>
          <select onChange={handleSubChange} value={subscription}>
              {subscriptionList && subscriptionList.map((sub, id) => {
                return (<option key={id} value={sub.id}>{sub.name}</option>)
              })}
          </select>
          
          <br/>

          <button className='login-btn' onClick={registerClick}>Create</button>
          <br/>

          <div className='success-msg'>{registerSuccessMsg}</div>
          <div className='error-msg'>{registerErrorMsg}</div>
      </div>
      
      <UserList subscriptions = {subscriptionList} reload={reload}/>
      


      <Footer top={530} />
    </div>
  );
};

export default Admin;