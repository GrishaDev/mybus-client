import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { Delete , Update } from '@material-ui/icons';

const useStyles = makeStyles(styles);

export default ({schedule, updateSchedule, deleteSchedule}) => {
    let rule = `Rule: ${JSON.stringify(schedule.rule)}`
    const classes = useStyles();
    
    return (
      <>
        <Paper elevation={3} className={classes.card}> 
          <div className={classes.title}> {schedule.id}</div> 
          <div className={classes.info}>
              <p> {rule}</p>
          </div>
          <div className={classes.actions}>
            <IconButton aria-label="update" onClick={()=> updateSchedule(schedule)}>
              <Update/>
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteSchedule(schedule)}>
              <Delete/>
            </IconButton>
          </div>
        </Paper>
      </>
    )
}

//() => updateSchedule({data: {a: 'a'}, id: schedule.id })