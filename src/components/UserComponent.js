
import { useState, useEffect } from 'react'
import * as utilsService from '../services/UtilsService';
import './UserComponent.css';
import { registerTexts } from '../texts';
import Popup from 'reactjs-popup';

const UserComponent = (props) => {

    const { selectedUser, subscriptions, setUsersList, setSelectedUser } = props;

    const [username, setUsername] = useState(selectedUser?.name ? selectedUser.name : '');
    const [email, setEmail] = useState(selectedUser?.email ? selectedUser.email : '');
    const [isAdmin, setIsAdmin] = useState(selectedUser?.isAdmin ? selectedUser.isAdmin : false);
    const [subscription, setSubscription] = useState(selectedUser?.subscriptionId ? selectedUser.subscriptionId : 0);
    const [subscriptionStart, setSubscriptionStart] = useState(selectedUser?.subscriptionStart ? selectedUser.subscriptionStart : '');
    const [subscriptionEnd, setSubscriptionEnd] = useState(selectedUser?.subscriptionEnd ? selectedUser.subscriptionEnd : '');
    const [openAlert, setAlertOpen] = useState(false);
    const [editErrorMsg, setEditErrorMsg] = useState('');
    const [editSuccessMsg, setEditSuccessMsg] = useState('');

    useEffect(() => {
        setUsername(selectedUser.name)
        setEmail(selectedUser?.email)
        setIsAdmin(selectedUser?.isAdmin)
        setSubscription(selectedUser?.subscriptionId )
        setSubscriptionStart(selectedUser?.subscriptionStart ? selectedUser.subscriptionStart.split('T')[0] : '')
        setSubscriptionEnd(selectedUser?.subscriptionEnd ? selectedUser.subscriptionEnd.split('T')[0] : '')
        console.log(selectedUser)
      },
      [selectedUser]);

    const handleSubChange = (e) => {
        setSubscription(e.target.value);
    };

    const handleToggle = (checked) => {
        setIsAdmin(!checked);
    };

    const openDeleteClick = () => {
      
        setAlertOpen(true)
    }
    const closeDeleteClick = () => {
        
        setAlertOpen(false)
    }

    const deleteClick = () => {
        closeDeleteClick();

         utilsService.deleteUser({ Id:selectedUser.id }).then(result => {
            utilsService.getUsers().then(result => {
                if(result && result.data){
                    setUsersList(result.data)
                }
              });
              setSelectedUser();
             closeDeleteClick();
        
         })
     
    }

    

    const editUserClick = () => {
        selectedUser.name = username;
        selectedUser.email = email;
        selectedUser.isAdmin = isAdmin;
        selectedUser.subscriptionId = subscription === 0 ? null : subscription;
        selectedUser.subscriptionStart = subscriptionStart;
        selectedUser.subscriptionEnd = subscriptionEnd;

        setEditSuccessMsg(registerTexts.editSuccess);   
        
        setTimeout(() => {
            setEditSuccessMsg('');   
        }, "5000")


        utilsService.editUser(selectedUser).then(result => {
            setEditSuccessMsg(registerTexts.editSuccess);   
        
            setTimeout(() => {
                setEditSuccessMsg('');   
            }, "5000")
        }).catch(error => {
            setEditErrorMsg(error.response.data ? error.response.data : registerTexts.error );   
            setTimeout(() => {
                setEditErrorMsg('');   
            }, "15000")
           });;
    };

    return (
        <div className='user-info-edit'>
          
            <Popup open={openAlert} onClose={closeDeleteClick} modal>

                <div className="modal popup">
                 Are you sure you want to delete the user?

                <br/>
                 <button className='delete-btn' style={{width:'30%', marginRight:'5%'}} onClick={deleteClick}>Yes</button> 
                 <button className='login-btn' style={{width:'30%'}} onClick={closeDeleteClick}>No</button>
                
                 
                </div>
            </Popup>
            <div className='edit-user-form'>
                <h5>Edit user</h5>

                <div className='user-logs'>
                {selectedUser.logs && selectedUser.logs.map((user, id) => {
                    return (
                         <div key={id}>
                            {user.description} - {new Date(user.timestamp).toLocaleDateString()}  {new Date(user.timestamp).toLocaleTimeString()}
                         </div>
                        )
                    })}
                 </div>

                <label>Username</label>
                <input className='login-input' type='text' placeholder=''
                    onChange={event => setUsername(event?.target?.value)}
                    value={username}
                />
                <br />
                <label>Email</label>
                <input className='login-input' type='text' placeholder=''
                    onChange={event => setEmail(event?.target?.value)}
                    value={email}
                />
                <br />
                
                <label>Is Admin?</label>
                <input className='login-input' type='checkbox'
                      onChange={() => handleToggle(isAdmin)}
                    // onChange={event => setIsAdmin(event?.target?.value)}
                    value={isAdmin} checked={isAdmin}
                />
                <br />
                <label>Subscription</label>
                <select onChange={handleSubChange} value={subscription}>
                    {subscriptions && subscriptions.map((sub, id) => {
                        return (<option key={id} value={sub.id}>{sub.name}</option>)
                    })}
                </select>

                <br />
                <label>Date Created</label>
                <input className='login-input' type='text' placeholder=''
                    onChange={event => setSubscriptionStart(event?.target?.value)}
                    value={subscriptionStart}
                />
                <br />
                <label>Date End</label>
                <input className='login-input' type='text' placeholder=''
                    onChange={event => setSubscriptionEnd(event?.target?.value)}
                    value={subscriptionEnd}
                />
            
                <button className='login-btn' onClick={editUserClick}>Edit</button>
                <br/>
                 <button className='delete-btn' onClick={openDeleteClick}>Delete</button> 

                <br/>

                 <div className='success-msg'>{editSuccessMsg}</div>
                 <div className='error-msg'>{editErrorMsg}</div>
            </div>
            
        </div>

    );
};

export default UserComponent;