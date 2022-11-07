import axios from 'axios';
import { artberryApiDomain, getSubscriptionsUrl, getUsersUrl } from '../config';
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

 export {
    getSubscriptions,
    getUsers
}