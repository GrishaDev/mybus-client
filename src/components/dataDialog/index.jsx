import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createScheduleRequest, updateScheduleRequest } from 'stateStuff/reducers/requestsReducer';
import {
    setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute,
    setChecked
} from 'stateStuff/reducers/formReducer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ScheduleForm from 'components/ScheduleForm';

import styles from './styles';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// if schedule === null then its add dialog  , otherwise its update dialog.
const DataDialog = ({ schedule, open, setOpen, createSchedule, updateSchedule, allFields, dialogStatus, loggedInMail, buttonDisabled,
    setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute, setChecked }) => {
    const classes = useStyles();

    const [dialogError, setDialogError] = React.useState(null);

    useEffect(() => {
        if (dialogStatus?.success) {
            setOpen(false);
            setDialogError(null);
        }

        if (dialogStatus && !dialogStatus.success) {
            setDialogError(String(dialogStatus.error));
        }
    }, [dialogStatus])

    useEffect(() => {
        if (schedule) {
            setMail(schedule?.mail);
            setBus(schedule?.bus);
            setStation(schedule?.station);
            setTrigger(schedule?.scheduleTrigger);
            setTimes(schedule?.times);
            setHour(schedule?.rule?.hour);
            setMinute(schedule?.rule?.minute);
            setChecked(schedule?.checked);
        }
        else {
            setMail(loggedInMail);
        }
    }, [open])

    const handleClose = () => {
        setOpen(false);
    };

    const confirm = () => {
        let { mail, bus, station, magic, spam, hour, minute, checked } = allFields;
        const rule  = {hour, minute};
        const data = {mail, bus, station, rule, magic, spam , checked}
        Object.keys(data).forEach(key => !data[key] ? delete data[key] : {})
        console.log(data);

        if (!schedule)
            createSchedule(data);
        else
            updateSchedule(data);
    }

    const title = schedule ? `Update Schedule ${schedule?.id}` : `Add new schedule`;
    return (
        <Dialog
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <ScheduleForm />
                <div className={classes.error}> {dialogError} </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    no
          </Button>
                <Button onClick={confirm} color="primary" disabled={buttonDisabled}>
                    {schedule ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const mapStateToProps = state => ({
    allFields: state.form,
    dialogStatus: state.form.dialogStatus,
    loggedInMail: state.myschedules.mail,
    buttonDisabled: state.form.error
});

const mapDispatchToProps = dispatch => {
    return {
        createSchedule: (data) => dispatch(createScheduleRequest(data)),
        updateSchedule: (data) => dispatch(updateScheduleRequest(data)),
        setMail: (e) => dispatch(setMail(e)),
        setBus: (e) => dispatch(setBus(e)),
        setStation: (e) => dispatch(setStation(e)),
        setTrigger: (e) => dispatch(setTrigger(e)),
        setTimes: (e) => dispatch(setTimes(e)),
        setHour: (e) => dispatch(setHour(e)),
        setMinute: (e) => dispatch(setMinute(e)),
        setChecked: (e) => dispatch(setChecked(e)),
    };
}

const ConnectedDataDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataDialog);

export default ConnectedDataDialog;