import  React,  { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest } from 'stateStuff/mainReducer';
import styles from './styles';
import Schedule from './Schedule';

const useStyles = makeStyles(styles);

const MainPage = ({getSchedules, updateSchedule, deleteSchedule, createSchedule, schedules}) => {
    const classes = useStyles();

    useEffect(()=> {
        console.log('make request');
        getSchedules()
    },[getSchedules]);
    
    let schedulesArr = schedules;
    let cards = schedulesArr.map((item) => <Schedule key={item.id} schedule={item} updateSchedule={updateSchedule} deleteSchedule={deleteSchedule}/>);
    
    return (
        <div className={classes.content}>
            {cards}
            {/* <p onClick={() => createSchedule({ahha: 'ahaha', id: 'lda'})}> create </p> */}
        </div>
    )
}

const mapStateToProps = state => ({
    schedules: state.schedules
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      getSchedules: () => dispatch(schedulesRequest()),
      deleteSchedule: (id) => dispatch(deleteScheduleRequest(id)),
      createSchedule: (data) => dispatch(createScheduleRequest(data)),
      updateSchedule: (data) => dispatch(updateScheduleRequest(data)),
    };
  }

const connectedMainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

export default connectedMainPage;