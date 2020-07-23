import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from 'stateStuff/reducers/schedulesReducer';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

const LoginPage = ({ login }) => {
  const classes = useStyles();
  const [mail, setMail] = useState('');

  React.useEffect(() => {
    localStorage.removeItem("auth");
  }, [])

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.formBox} >
        <svg viewBox="0 0 500 130" preserveAspectRatio="xMinYMin meet">
          <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill:'rgba(0,0,0,0.2)'}}></path>
        </svg>
        <div className={classes.forceTitle}>Hello</div>
        {/* <form onSubmit={(event) => { event.preventDefault(); login(mail) }}> */}
            <div className={classes.form}>
              <TextField className={classes.mailField} margin="normal" variant="outlined" label="mail" name="mail" type='mail' onChange={(e) => setMail(e.target.value)} />
              <Button margin="normal" color="primary" disabled={!mail} onClick={()=> login(mail)}>Login</Button>
            </div>
        {/* </form> */}
      </Paper>
    </div>
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