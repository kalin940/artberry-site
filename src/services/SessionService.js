import axios from 'axios';
import { artberryApiDomain, getSessionUrl, checkSessionUrl,checkAdminSessionUrl, logoutUrl } from '../config';
import SessionHelper from '../helpers/SessionHelper';


const getSession = async (data) => { 
   return await axios.post(artberryApiDomain + getSessionUrl, data);
}

const clearSession = async () => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.get(artberryApiDomain + logoutUrl, config);
}

const chechSession = async () => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.get(artberryApiDomain + checkSessionUrl, config);
}

const chechAdminSession = async () => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.get(artberryApiDomain + checkAdminSessionUrl, config);
}

export {
    getSession,
    clearSession,
    chechSession,
    chechAdminSession
}