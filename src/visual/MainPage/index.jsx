import  React,  { useEffect } from 'react';
import { connect } from 'react-redux';
import { schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest } from 'stateStuff/mainReducer';


// const getMembers = () => {
//   // Make API call to populate component with data
// };

const MainPage = ({getSchedules, updateSchedule, deleteSchedule, createSchedule, schedules}) => {

    useEffect(()=> {
        console.log('make request');
        getSchedules()
    },[getSchedules]);
    
    let schedulesArr = schedules;
    let cards = schedulesArr.map((item) => 
        <div key={item.id}> 
          <p> {JSON.stringify(item)} </p>
          <button onClick={() => updateSchedule({data: {a: 'a'}, id: item.id })}> UPDATE </button>
          <button onClick={() => deleteSchedule(item.id)}> DELETE </button>
        </div>);

    return (
        <div>
            {cards}
            <p onClick={() => createSchedule({ahha: 'ahaha', id: 'lda'})}> create </p>
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