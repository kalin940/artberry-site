
import './UserList.css';
import { useState, useEffect } from 'react'
import * as utilsService from '../services/UtilsService';
import UserComponent from './UserComponent';
const UserList = (props) => {

    const { subscriptions, reload } = props;

    const [usersList, setUsersList] = useState([]);

    const  [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        utilsService.getUsers().then(result => {
            if(result && result.data){
                setUsersList(result.data)
            }
          });

    }, [reload]);


    const selectUserClick = (id) => {
        const newSelect = usersList.find(p => p.id === id);
       
        utilsService.getUserLogs(id).then(result => {
            if(result && result.data){
                // console.log(result.data)
                newSelect.logs = result.data
            }
           
            setSelectedUser(newSelect) 
        })
      };

    return (
        <div className='users-list'>
            <table className='users-table'>
            <tbody>
                <tr>
                    <td hidden={true}>ID</td>
                    <td>UserName</td>
                    <td>Email</td>
                    <td>Is Admin</td>
                    <td>Subscription</td>
                    <td>Subscription Start</td>
                    <td>Subscription End</td>
                </tr>
                {usersList && usersList.map((user, id) => {
                    return (
                    <tr key={id} value={user.id} onClick={()=> selectUserClick(user.id)}>
                       <td hidden={true}>{user.id}</td> 
                       <td>{user.name}</td> 
                       <td>{user.email}</td> 
                       <td>{user.isAdmin ? 'Yes' : 'No'}</td> 
                       <td>{user.subscriptionId ? subscriptions.find(p => p.id == user.subscriptionId)?.name : ''}</td> 
                       <td>{user.subscriptionStart ? user.subscriptionStart.split('T')[0] : '' }</td> 
                       <td>{user.subscriptionEnd ? user.subscriptionEnd.split('T')[0] : '' }</td> 
                    </tr>)
                })}
                </tbody>
            </table>
           { selectedUser ? (<UserComponent selectedUser = {selectedUser} subscriptions = {subscriptions} setUsersList={setUsersList} setSelectedUser={setSelectedUser}/>) : ''}
           
      </div>

    );
};

export default UserList;