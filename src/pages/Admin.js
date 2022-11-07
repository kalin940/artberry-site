import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import SessionHelper from '../helpers/SessionHelper';
import UserList from '../components/UserList';
import './Admin.css';
import * as sessionService from '../services/SessionService';
import * as utilsService from '../services/UtilsService';

const Admin = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState(0);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {
      navigate('../login', { replace: true })
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

  return (
    <div className='music-page'>

      <div className='music-menu-bottom'>
        <img src={logo} alt="logo" className='logo-left' onClick={logoClick} />
        <div className='admin-menu-right'>
          <Link to="../">Начало</Link> <Link to="/music">Слушай</Link>
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
          <input className='login-input' type='checkbox' placeholder=''
            onChange={event => setIsAdmin(event?.target?.value)}
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

          <button className='login-btn'>Create</button>
      </div>
      
      <UserList subscriptions = {subscriptionList}/>
      


      <Footer top={530} />
    </div>
  );
};

export default Admin;