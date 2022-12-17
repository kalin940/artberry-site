import axios from 'axios';
import { artberryApiDomain, getSubscriptionsUrl, getUsersUrl, editUserUrl, deleteUserUrl,
         registerUrl, resetPasswordUrl, getUserBySessionUrl, changeEmailUrl, changePasswordUrl,
         redListenLog, whiteListenLog, getLogs } from '../config';
import SessionHelper from '../helpers/SessionHelper';

const getSubscriptions = async () => { 
    return await axios.get(artberryApiDomain + getSubscriptionsUrl);
 }

const getUsers = async () => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.get(artberryApiDomain + getUsersUrl, config);
 } 

 const getUserBySession = async () => { 
  const config = {
      headers:{
          SessionId: SessionHelper.getSession()
      }
    };
  return await axios.get(artberryApiDomain + getUserBySessionUrl, config);
} 


 const editUser = async (data) => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.post(artberryApiDomain + editUserUrl, data, config);
 } 

 const deleteUser = async (data) => { 
  const config = {
      headers:{
          SessionId: SessionHelper.getSession()
      }
    };
  return await axios.post(artberryApiDomain + deleteUserUrl, data, config);
} 

 const registerUser = async (data) => { 
    const config = {
        headers:{
            SessionId: SessionHelper.getSession()
        }
      };
    return await axios.post(artberryApiDomain + registerUrl, data, config);
 } 

 const resetPassword = async (email) => { 
    return await axios.post(artberryApiDomain + resetPasswordUrl, email);
 }
 
 const changeEmail = async (data) => {
  const config = {
    headers:{
        SessionId: SessionHelper.getSession()
    }
  };
  return await axios.post(artberryApiDomain + changeEmailUrl, data,config);
 }
 
 const changePassword = async (data) => {
  const config = {
    headers:{
        SessionId: SessionHelper.getSession()
    }
  };
  return await axios.post(artberryApiDomain + changePasswordUrl, data,config);
 }

 const getRedLog = async () => { 
  const config = {
    headers:{
        SessionId: SessionHelper.getSession()
    }
  };
  return await axios.get(artberryApiDomain + redListenLog, config);
}

const getWhiteLog = async () => { 
  const config = {
    headers:{
        SessionId: SessionHelper.getSession()
    }
  };
  return await axios.get(artberryApiDomain + whiteListenLog, config);
}

const getUserLogs = async (id) => { 
  const config = {
    headers:{
        SessionId: SessionHelper.getSession()
    }
  };
  return await axios.get(artberryApiDomain + getLogs + `${id}`, config);
}

 export {
    getSubscriptions,
    editUser,
    getUsers,
    registerUser,
    resetPassword,
    getUserBySession,
    changeEmail,
    changePassword,
    deleteUser,
    getRedLog,
    getWhiteLog,
    getUserLogs
}