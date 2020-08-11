import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

const picked = {backgroundColor: 'green'};

const daysData = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default ({dayofweek = [], handleDaysChange}) => {
    const classes = useStyles();
    
    // const [weekDays, setWeekDays] = React.useState(dayofweek);

    const clickDay = (day) => {
        if(dayofweek.includes(day)) {
            const filteredArray = dayofweek.filter(item => item !== day);
            handleDaysChange(filteredArray);
        }
        else {
            handleDaysChange([...dayofweek, day])
        }
    }

    const days = daysData.map((day, index)=> 
        <div key={index} className={classes.day} style={isPicked(index, dayofweek)} onClick={()=> clickDay(index)}>{day}</div>)

    
    return (
        <div className={classes.picker}>
            <p className={classes.title}> When to repeat the schedule? </p>
            <div className={classes.week}>
                {days}
            </div>
        </div>
    )
}

const isPicked = (dayNum, dayofweek) => {
    return (dayofweek.includes(dayNum) ? picked : null)
}

