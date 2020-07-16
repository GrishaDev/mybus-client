import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { Delete , Update } from '@material-ui/icons';
import 'App.css'

const useStyles = makeStyles(styles);

export default ({schedule, updateSchedule, deleteSchedule}) => {
    let rule = `Rule: ${JSON.stringify(schedule.rule)}`
    const classes = useStyles();
    // const [collapse, setCollapse] = React.useState();

    const clickUpdate= e => {
      e.stopPropagation();
      updateSchedule(schedule)
    }; 

    const clickDelete= e => {
      e.stopPropagation();
      deleteSchedule(schedule)
    }; 

    return (
      <>
        <Paper elevation={3} className={classes.card}> 
          <div className={classes.title}> {schedule.id}</div> 
          <div className={classes.info}>
              <p> {rule}</p>
          </div>
          <div className={classes.actions}>
            <IconButton aria-label="update" onClick={clickUpdate}>
              <Update/>
            </IconButton>
            <IconButton aria-label="delete" onClick={clickDelete}>
              <Delete/>
            </IconButton>
          </div>
        </Paper>
      </>
    )
}

//() => updateSchedule({data: {a: 'a'}, id: schedule.id })