import  React,  { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Flipper, Flipped } from "react-flip-toolkit";
import { schedulesRequest, deleteScheduleRequest, updateSnackbar } from 'stateStuff/reducers/requestsReducer';
import 'App.css'
import styles from './styles';
import Schedule from './Schedule';
import DeleteDialog from 'components/DeleteConfirm';
import ViewSchedule from './ViewSchedule';
import DataDialog from 'components/dataDialog';

const useStyles = makeStyles(styles);

const MainPage = ({getSchedules, deleteSchedule, schedules, updateSnackbar}) => {
    const classes = useStyles();
    const snackbar = useSnackbar();

    // const [dialogError, setDialogError] = React.useState();
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    // const [currentSchedule, setCurrentSchedule] = React.useState();

    // Get new schedule cards everytime they change
    useEffect(()=> {
        getSchedules()
    },[getSchedules]);


    // Update snackbar context, done once
    useEffect(() => {
      updateSnackbar(snackbar) 
    // eslint-disable-next-line
    }, [snackbar])

    const handleOpenUpdate = (schedule) => {
      // setCurrentSchedule(schedule);
      // console.log(currentSchedule);
      setOpenUpdate(schedule);
    }
    const handleOpenDelete = (schedule) => {
      // setCurrentSchedule(schedule);
      setOpenDelete(schedule);
    }
    const handleOpenView = async (schedule) => {
      // setCurrentSchedule(schedule);
      setOpenView(schedule);
      // setCurrentSchedule(schedule);
    }

    const handleConfirmDelete = () => {
      deleteSchedule(openDelete.id);
      setOpenDelete(false);
    }

    // console.log('content');
    let cards;


    if(schedules.length > 0) {
      let schedulesArr = schedules;
      cards = schedulesArr.map((item) =>
        <Flipped flipId={item.id} key={item.id}>
          <div onClick={()=>handleOpenView(item)}><Schedule schedule={item} updateSchedule={handleOpenUpdate} deleteSchedule={handleOpenDelete}/></div>
        </Flipped>);
    }
    else {
      cards = <p className={classes.noSchedules}> You don't have any schedules, be sure to create. </p>
    }

    return (
      <>
        <Flipper flipKey={cards.length}>
            <div className={classes.content}>
                  {cards}
            </div>
        </Flipper>

        <DataDialog open={openUpdate ? true : false} setOpen={setOpenUpdate} schedule={openUpdate}/>
        <DeleteDialog open={openDelete ? true : false} setOpen={setOpenDelete} item={openDelete} onConfirm={handleConfirmDelete}/>
        <ViewSchedule open={openView ? true : false} setOpen={setOpenView} schedule={openView} />
      </>
    )
}

const mapStateToProps = state => ({
    schedules: state.myschedules.schedules,
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      updateSnackbar: (snackbar) => dispatch(updateSnackbar(snackbar)),
      getSchedules: () => dispatch(schedulesRequest()),
      deleteSchedule: (id) => dispatch(deleteScheduleRequest(id)),
    };
  }

const connectedMainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

export default connectedMainPage;


//             {/* <p onClick={() => createSchedule({ahha: 'ahaha', id: 'lda'})}> create </p> */}