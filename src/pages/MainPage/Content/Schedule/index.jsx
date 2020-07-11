import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { Delete , Update } from '@material-ui/icons';

import Dialog from './Dialog';

const useStyles = makeStyles(styles);

export default ({schedule, updateSchedule, deleteSchedule}) => {
    let rule = `Rule: ${JSON.stringify(schedule.rule)}`
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Paper elevation={3} className={classes.card}> 
          <div className={classes.title}> {schedule.id}</div> 
          <div className={classes.info}>
              <p> {rule}</p>
          </div>
          <div className={classes.actions}>
            <IconButton aria-label="update" onClick={()=> setOpen(true)}>
              <Update/>
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteSchedule(schedule.id)}>
              <Delete/>
            </IconButton>
          </div>
        </Paper>
        <Dialog open={open} setOpen={setOpen} schedule={schedule}/>
      </>
    )
}

//() => updateSchedule({data: {a: 'a'}, id: schedule.id })