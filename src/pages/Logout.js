import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import * as sessionService from '../services/SessionService';
import SessionHelper from '../helpers/SessionHelper';
const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
       
        sessionService.clearSession().then(result => {
            SessionHelper.clearSession();
            navigate('../')
        });
    
      }, []);

    return (
        <div>logout...</div>
    );
};

export default Logout;