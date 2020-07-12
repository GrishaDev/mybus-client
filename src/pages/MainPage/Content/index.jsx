import  React,  { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { schedulesRequest, deleteScheduleRequest, createScheduleRequest, updateScheduleRequest, updateSnackbar } from 'stateStuff/mainReducer';
import styles from './styles';
import Schedule from './Schedule';
import UpdateDialog from './Dialog';
import DeleteDialog from 'components/DeleteConfirm';

const useStyles = makeStyles(styles);

const MainPage = ({getSchedules, updateSchedule, deleteSchedule, createSchedule, schedules, updateSnackbar}) => {
    const classes = useStyles();
    const snackbar = useSnackbar();

    useEffect(()=> {
        console.log('make request');
        getSchedules()
    },[getSchedules]);

    useEffect(() => {
      updateSnackbar(snackbar) 
    }, [snackbar])
  
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [currentSchedule, setCurrentSchedule] = React.useState({id: 'retarded  react'});

    const handleOpenUpdate = (schedule) => {
      setOpenUpdate(true);
      setCurrentSchedule(schedule);
    }
    const handleOpenDelete = (schedule) => {
      setOpenDelete(true);
      setCurrentSchedule(schedule);
    }
    const handleConfirmDelete = () => {
      deleteSchedule(currentSchedule.id);
      setOpenDelete(false);
    }

    const handleConfirmUpdate = (data) => {
      updateSchedule(data);
      setOpenUpdate(false);
    }

    // if(error) {
    //   enqueueSnackbar('error');
    // }

    let schedulesArr = schedules;
    let cards = schedulesArr.map((item) => <Schedule key={item.id} schedule={item} updateSchedule={handleOpenUpdate} deleteSchedule={handleOpenDelete}/>);
    
    return (
      <>
        <div className={classes.content}>
            {cards}
        </div>
        <UpdateDialog open={openUpdate} schedule={currentSchedule} setOpen={setOpenUpdate} onConfirm={handleConfirmUpdate}/>
        <DeleteDialog open={openDelete} setOpen={setOpenDelete} item={currentSchedule} onConfirm={handleConfirmDelete}/>
      </>
    )
}

const mapStateToProps = state => ({
    schedules: state.schedules,
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      updateSnackbar: (snackbar) => dispatch(updateSnackbar(snackbar)),
      getSchedules: () => dispatch(schedulesRequest()),
      deleteSchedule: (id) => dispatch(deleteScheduleRequest(id)),
      updateSchedule: (data) => dispatch(updateScheduleRequest(data)),
    };
  }

const connectedMainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

export default connectedMainPage;


//             {/* <p onClick={() => createSchedule({ahha: 'ahaha', id: 'lda'})}> create </p> */}