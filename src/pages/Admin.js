import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Footer from '../components/Footer';
import logo from '../styles/air_artbbery_m.png';
import SessionHelper from '../helpers/SessionHelper';
import './Admin.css';
import * as sessionService from '../services/SessionService';

const Admin = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    let sessionId = SessionHelper.getSession();
    if (sessionId === null || sessionId === undefined || sessionId === '') {
      navigate('../login', { replace: true })
    }

    //Check session
    sessionService.chechAdminSession().then(result => {
      if(result && result.data){
        
        if(!result.data){
          navigate('../login', { replace: true })
        }
      }
    })

  }, []);

  const logoClick = () => {
    navigate('../', { replace: true })
  }


  return (
    <div className='music-page'>

      <div className='music-menu-bottom'>
        <img src={logo} alt="logo" className='logo-left' onClick={logoClick} />
        <div className='admin-menu-right'>
          <Link to="../">Начало</Link> <Link to="/music">Слушай</Link>
        </div>
      </div>

      <div className='create-user-form'>
      </div>

      <Footer top={150} />
    </div>
  );
};

export default Admin;