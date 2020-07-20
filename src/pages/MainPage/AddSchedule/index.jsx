import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
// import { connect } from 'react-redux';
// import { createScheduleRequest } from 'stateStuff/reducers/requestsReducer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import AddDialog from './AddDialog';
import DataDialog from 'components/dataDialog';

const useStyles = makeStyles(styles);

export default () => {
    const classes = useStyles();

    const [openCreate, setopenCreate] = React.useState(false);

    const handleOpenCreate = () => {
      setopenCreate(true);
    }
    
    return (
        <>
            <Fab color="primary" aria-label="add" className={classes.AddButton} onClick={()=> handleOpenCreate()}>
                <AddIcon />
            </Fab>
            <DataDialog open={openCreate} setOpen={setopenCreate}/>
        </>
    )
}
  