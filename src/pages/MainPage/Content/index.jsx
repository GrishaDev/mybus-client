import  React,  { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Flipper, Flipped } from "react-flip-toolkit";
import { schedulesRequest, deleteScheduleRequest, updateScheduleRequest, updateSnackbar } from 'stateStuff/mainReducer';
import 'App.css'
import styles from './styles';
import Schedule from './Schedule';
import UpdateDialog from './UpdateDialog';
import DeleteDialog from 'components/DeleteConfirm';
import ViewSchedule from './ViewSchedule';

const useStyles = makeStyles(styles);

let currentSchedule;
const MainPage = ({dialogStatus, getSchedules, updateSchedule, deleteSchedule, schedules, updateSnackbar}) => {
    const classes = useStyles();
    const snackbar = useSnackbar();

    const [dialogError, setDialogError] = React.useState();
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);

    useEffect(()=> {
      if(dialogStatus?.success) {
        setOpenUpdate(false);
        setDialogError(null);
      }
  
      if(dialogStatus && !dialogStatus.success) {
        setDialogError(String(dialogStatus.error));
      }
    },[dialogStatus])

    useEffect(()=> {
        getSchedules()
    },[getSchedules]);

    useEffect(() => {
      console.log('test')
      updateSnackbar(snackbar) 
    }, [snackbar])
  
    
    // const [currentSchedule, setCurrentSchedule] = React.useState();

    const handleOpenUpdate = (schedule) => {
      currentSchedule = schedule;
      setOpenUpdate(true);
      // setCurrentSchedule(schedule);
    }
    const handleOpenDelete = (schedule) => {
      currentSchedule = schedule;
      setOpenDelete(true);
      // setCurrentSchedule(schedule);
    }
    const handleOpenView = (schedule) => {
      currentSchedule = schedule;
      setOpenView(true);
      // setCurrentSchedule(schedule);
    }

    const handleConfirmDelete = () => {
      deleteSchedule(currentSchedule.id);
      setOpenDelete(false);
    }

    const handleConfirmUpdate = (data) => {
      updateSchedule(data);
      // setOpenUpdate(false);
    }

    let schedulesArr = schedules;
    let cards = schedulesArr.map((item) =>
      <Flipped flipId={item.id} key={item.id}>
        <div onClick={()=>handleOpenView(item)}><Schedule schedule={item} updateSchedule={handleOpenUpdate} deleteSchedule={handleOpenDelete}/></div>
      </Flipped>);

    return (
      <>
        <Flipper flipKey={cards.length}>
            <div className={classes.content}>
                  {cards}
            </div>
        </Flipper>

        <UpdateDialog open={openUpdate} schedule={currentSchedule} setOpen={setOpenUpdate} onConfirm={handleConfirmUpdate} dialogError={dialogError} />
        <DeleteDialog open={openDelete} setOpen={setOpenDelete} item={currentSchedule} onConfirm={handleConfirmDelete}/>
        <ViewSchedule open={openView} setOpen={setOpenView} schedule={currentSchedule} />
      </>
    )
}

const mapStateToProps = state => ({
    dialogStatus: state.dialogStatus,
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