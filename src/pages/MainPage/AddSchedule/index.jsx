import  React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { connect } from 'react-redux';
import { createScheduleRequest } from 'stateStuff/reducers/requestsReducer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import AddDialog from './AddDialog';
import DataDialog from 'components/dataDialog';

const useStyles = makeStyles(styles);

const AddSchedule =  ({createSchedule, dialogStatus}) => {
    const classes = useStyles();

    const [openCreate, setopenCreate] = React.useState(false);
    const [dialogError, setDialogError] = React.useState();

    useEffect(()=> {
      if(dialogStatus?.success) {
        setopenCreate(false);
        setDialogError(null);
      }
  
      if(dialogStatus && !dialogStatus.success) {
        console.log("haha dialog status");
        console.log(dialogStatus);
        setDialogError(String(dialogStatus.error));
      }
    },[dialogStatus])

    

    const handleOpenCreate = () => {
      setopenCreate(true);
    }
    // const handleConfirmCreate = (data) => {
    //   createSchedule(data);
    //   // setopenCreate(false);
    // }

    

    return (
        <>
            <Fab color="primary" aria-label="add" className={classes.AddButton} onClick={()=> handleOpenCreate()}>
                <AddIcon />
            </Fab>
            {/* <AddDialog open={openCreate} setOpen={setopenCreate} onConfirm={handleConfirmCreate} dialogError={dialogError}/> */}
            <DataDialog open={openCreate} setOpen={setopenCreate}/>
        </>
    )
}
  
  const mapStateToProps = state => ({
    dialogStatus: state.form.dialogStatus,
  });

  const mapDispatchToProps = dispatch => {
    return {
      createSchedule: (data) => dispatch(createScheduleRequest(data)),
    };
  }

const connectedAdd = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSchedule);

export default connectedAdd;
