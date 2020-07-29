import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from 'stateStuff/reducers/schedulesReducer';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles(styles);

const LoginPage = ({ login, dialogStatus }) => {
  const classes = useStyles();
  const [mail, setMail] = useState('');
  const [dialogError, setDialogError] = React.useState(null);

  React.useEffect(() => {
    if (dialogStatus?.success) {
        setDialogError(null);
    }

    if (dialogStatus && !dialogStatus.success) {
        setDialogError(String(dialogStatus.error));
    }
    // eslint-disable-next-line
  }, [dialogStatus])

  React.useEffect(() => {
    localStorage.removeItem("auth");
  }, [])


  const keypress = e => {
    if(e.key === 'Enter' && mail) {
      login(mail);
      e.preventDefault();
    }
  }
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.formBox} >
        {/* <div className={classes.svgContainer} > */}
            <svg viewBox="0 0 500 230" preserveAspectRatio="xMinYMin meet" >
              <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill:'rgba(0,0,0,0.2)'}}></path>
            </svg>
        {/* </div> */}
        <div className={classes.forceTitle}>Hello</div>
        {/* <form onSubmit={(event) => { event.preventDefault(); login(mail) }}> */}
            <div className={classes.form}>
              <TextField required autoFocus className={classes.mailField} margin="normal" variant="outlined" label="mail" name="mail" type='mail' 
                onChange={(e) => setMail(e.target.value)} onKeyPress={keypress}/>
              <Button endIcon={<VpnKeyIcon />} type="submit" margin="normal" color="primary" disabled={!mail} onClick={()=> login(mail)}>Login</Button>
              
            </div>
            <div className={classes.error}> {dialogError} </div>
        {/* </form> */}
      </Paper>
    </div>
  )
}

const mapStateToProps = state => ({
  dialogStatus: state.form.dialogStatus,
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