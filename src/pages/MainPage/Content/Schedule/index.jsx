import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
import { Delete , Update } from '@material-ui/icons';
import 'App.css'
import ruleConverter from 'utils/ruleConverter';
import Badge from '@material-ui/core/Badge';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles(styles);

const stringToHslColor =(str, s = 30, l = 50) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 160; // 360
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}

export default React.memo(({schedule, updateSchedule, deleteSchedule}) => {
    const rule = `${ruleConverter(schedule.rule)}`
    const classes = useStyles();
    const [animate, SetAnimate] = React.useState(true);

    const isFirstRender = React.useRef(true);
    // eslint-disable-next-line
    React.useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      SetAnimate(false);
    });


    const clickUpdate= e => {
      e.stopPropagation();
      updateSchedule(schedule)
    }; 

    const clickDelete= e => {
      e.stopPropagation();
      deleteSchedule(schedule)
    }; 

    const bg = stringToHslColor(schedule.id);

    return (
      <>
        <Paper elevation={3} className={`${classes.card} ${animate ? classes.animate : null}`} style={{background: bg}}> 
          <Badge className={classes.bus} badgeContent={schedule.bus} max={999} color="primary">
            <DirectionsBusIcon fontSize="small" />
          </Badge>
          <div className={classes.title}>
            {/* <div className={classes.container}> */}
              <svg viewBox="0 0 500 130" preserveAspectRatio="xMinYMin meet">
                <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill:'rgba(0,0,0,0.2)'}}></path>
              </svg>
              <div className={classes.forceTitle}>{schedule.name}</div>
            {/* </div> */}
             
          </div> 
          <div className={classes.info}>
              <ScheduleIcon style={{marginTop: 10}}/> <p>{rule}</p>
          </div>
          <div className={classes.actions}>
            <IconButton style={{color: 'white'}} aria-label="update" onClick={clickUpdate}>
              <Update/>
            </IconButton>
            <IconButton style={{color: 'white'}} aria-label="delete" onClick={clickDelete}>
              <Delete/>
            </IconButton>
          </div>
        </Paper>
      </>
    )
})
