import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { connect } from 'react-redux';
import { createScheduleRequest } from 'stateStuff/mainReducer';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(styles);

const AddSchedule =  ({createSchedule}) => {
    const classes = useStyles();
    return (
        <>
            <Fab color="primary" aria-label="add" className={classes.AddButton} onClick={()=> createSchedule({})}>
                <AddIcon />
            </Fab>
        </>
    )
}
  
  const mapDispatchToProps = dispatch => {
    return {
      createSchedule: (data) => dispatch(createScheduleRequest(data)),
    };
  }

const connectedAdd = connect(
    null,
    mapDispatchToProps
)(AddSchedule);

export default connectedAdd;
