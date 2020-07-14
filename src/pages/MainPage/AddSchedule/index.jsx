import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { connect } from 'react-redux';
import { createScheduleRequest } from 'stateStuff/mainReducer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog';

const useStyles = makeStyles(styles);

const AddSchedule =  ({createSchedule}) => {
    const classes = useStyles();

    const [openCreate, setopenCreate] = React.useState(false);

    const handleOpenCreate = () => {
      setopenCreate(true);
    }
    const handleConfirmCreate = (data) => {
      createSchedule(data);
      setopenCreate(false);
    }


    return (
        <>
            <Fab color="primary" aria-label="add" className={classes.AddButton} onClick={()=> handleOpenCreate()}>
                <AddIcon />
            </Fab>
            <AddDialog open={openCreate} setOpen={setopenCreate} onConfirm={handleConfirmCreate}/>
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
