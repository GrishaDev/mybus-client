import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import styles from './styles';
import ruleConverter from 'utils/ruleConverter';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default ({ open, setOpen, schedule }) => {
  const classes = useStyles();


  const handleClose = () => {
    setOpen(false);
  };


  const title = `Schedule ${schedule?.name || 'something'}`;

    const keys = Object.keys(schedule);
    const values = Object.values(schedule);
    
    const scheduleFields = values.map((item,index) => {
        let text = item;
        switch(keys[index]) {
          case 'rule':
            text = ruleConverter(item);
            break;
          case 'scheduleTrigger':
            text = `max: ${item.max}, min: ${item.min}`;
            break;
          case 'webPushSub':
            text = item ? true : false
            break;
          default:
            break;
        }
        return <div key={index} className={classes.item}>{`${keys[index]}: ${text}`}</div>
    });

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.center}>{title}</DialogTitle>
        <DialogContent className={classes.content}>
          {scheduleFields}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
  )
}
