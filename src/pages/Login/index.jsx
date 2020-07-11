import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from 'stateStuff/mainReducer';

const LoginPage = (props) => {
    const [mail, setMail] = useState('');
    return (
        <form onSubmit={(event) => { event.preventDefault(); props.login(mail) }}>
          <label>
            Mail
            <input type='mail' onChange={(e)=> setMail(e.target.value)}/>
          </label>
          <input type="submit" value="login"/>
        </form>   
    )
}

const mapStateToProps = state => ({
    state
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (mail) => dispatch(loginRequest(mail)),
    };
  }

const connectedLoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default connectedLoginPage;