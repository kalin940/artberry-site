
import * as utilsService from '../services/UtilsService';
import { loginTexts, registerTexts } from '../texts';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const ForgottenPassword = () => {

  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const navigate = useNavigate();

  const resetPassClick = (e) => {
     if (email === '' || email === null ) {
      setErrorMsg(loginTexts.noUsername);
      return;
     }
     setDisableButton(true)
     let data = { Username: email};

     utilsService.resetPassword(data).then(result => {
      setSuccessMsg(loginTexts.resetPassword)
     }).catch(error =>
       console.log(error)
      )

  };

    return (
      <div>
        <div style={{ marginTop: '10%', height:'130px', borderStyle:'groove', paddingTop:'1%', marginLeft:'40%', marginRight: '40%' }}>
          <label style={{ marginRight: '1%' }}>Please enter your username:</label>
            <input type='text' placeholder=''
              onChange={event => setEmail(event?.target?.value)}
              value={email}
            />
            <br/>
            <button style={{ width: '100px', marginTop:'25px' }} className='login-btn' disabled={email === '' || disableButton} onClick={resetPassClick}>Submit</button>
            <div className='error-msg'>{errorMsg}</div>
            <div className='success-msg'>{successMsg}</div>
        </div>
        <br/>
        <Link className='login-link' to="/" >← Go to Air Artberry</Link>
      </div>
    );
  };
  
  export default ForgottenPassword;