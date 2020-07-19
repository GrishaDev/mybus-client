import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ScheduleForm from 'components/ScheduleForm';

import styles from './styles';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ dialogError, open, setOpen, schedule, onConfirm }) => {
  const classes = useStyles();

  const [data, setData] = React.useState(null);

  useEffect(()=> {
    setData(schedule);
  },[schedule])

  
  const [error, setError] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewData = (data) => {

    if(!data.mail || !data.bus || !data.station || !data.rule?.hour || !data.rule?.minute) {
      setError(true);
    }
    else setError(false);

    setData(data);
  }

  const title = `Update Schedule ${schedule?.id}`;
  return (
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <ScheduleForm data={data} setData={handleNewData}/>
          <div className={classes.error}> {dialogError} </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            no
          </Button>
          <Button onClick={() => onConfirm(data)} color="primary" disabled={error}>
            update
          </Button>
        </DialogActions>
      </Dialog>
  )
}
