import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createScheduleRequest, updateScheduleRequest } from 'stateStuff/reducers/requestsReducer';
// import {
//     setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute,
//     setChecked
// } from 'stateStuff/reducers/formReducer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ScheduleForm from 'components/ScheduleForm';

import styles from './styles';
import { NightsStay } from '@material-ui/icons';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// if schedule === null then its add dialog  , otherwise its update dialog.
const DataDialog = ({ schedule, open, setOpen, createSchedule, updateSchedule, dialogStatus, loggedInMail }) => {
    const classes = useStyles();

    const [dialogError, setDialogError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [form, setForm] = React.useState({
        confirmDisabled: true,
        mail: {touched: false, value: ''},
        name: {touched: false, value: ''},
        bus: {touched: false, value: ''},
        station: {touched: false, value: ''},
        trigger: {touched: false, value: ''},
        times: {touched: false, value: ''},
        hour: {touched: false, value: ''},
        minute: {touched: false, value: ''},
        checked: {touched: false, value: false}})
    
    useEffect(() => {
        if (dialogStatus?.success) {
            setOpen(false);
            setDialogError(null);
            setLoading(false);
        }

        if (dialogStatus && !dialogStatus.success) {
            setDialogError(String(dialogStatus.error));
            setLoading(false);
        }
    // eslint-disable-next-line
    }, [dialogStatus])

    useEffect(() => {
        if (schedule) {
            setForm({...form, mail: {touched: false, value: schedule?.mail || '' },
                name: {touched: false, value: schedule?.name || ''},
                hour: {touched: false, value: schedule?.rule?.hour || '' },
                minute: {touched: false, value: schedule?.rule?.minute || '' },
                bus: {touched: false, value: schedule?.bus || ''},
                station: {touched: false, value: schedule?.station || ''},
                trigger: {touched: false, value: schedule?.scheduleTrigger || '' },
                times: {touched: false, value: schedule?.times || '' },
                checked: {touched: false, value: schedule?.webPushSub ? true : false}});
        }
        else {
            setForm({...form, mail: {touched: false, value: loggedInMail },
                name: {touched: false, value: ''},
                hour: {touched: false, value: '' },
                minute: {touched: false, value: '' },
                bus: {touched: false, value: ''},
                station: {touched: false, value: ''},
                trigger: {touched: false, value: '' },
                times: {touched: false, value: '' },
                checked: {touched: false, value: false }});

        }
        setDialogError(null);
        setLoading(false);
    // eslint-disable-next-line
    }, [open])

    const handleClose = () => {
        setOpen(false);
    };

    const confirm = () => {
        console.log(form);

        let { mail, bus, station, trigger, times, hour, minute, checked, name } = form;

        console.log(trigger);
        console.log(trigger.value);
        console.log(trigger.value || null);
        let a = trigger.value || null;
        console.log(a);
        
        const rule  = {hour: hour.value , minute: minute.value};
        const data = {mail: mail.value, name: name.value ,bus: bus.value, station: station.value,
        rule, scheduleTrigger: trigger.value || null, times: times.value || null}

        Object.keys(data).forEach(key => !data[key] ? delete data[key] : {})

        console.log(JSON.stringify(checked.value));

        if(checked.touched) data.webPushSub = checked.value || false;
        
        console.log(data);

        setLoading(true);

        if (!schedule)
            createSchedule(data);
        else
            updateSchedule({id: schedule.id, data});
    }

    const isBad = () => (!form.mail.value || !form.name.value || !form.bus.value || !form.station.value || !form.hour.value || !form.minute.value)

    const title = schedule ? `Update Schedule ${schedule?.name}` : `Add new schedule`;
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
            {loading && <LinearProgress />}
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                
                <ScheduleForm form={form} setForm={setForm} />
                <div className={classes.error}> {dialogError} </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    no
          </Button>
                <Button onClick={confirm} color="primary" disabled={isBad()}>
                    {schedule ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const mapStateToProps = state => ({
    // allFields: state.form,
    dialogStatus: state.form.dialogStatus,
    loggedInMail: state.myschedules.mail,
    // buttonDisabled: state.form.error
});

const mapDispatchToProps = dispatch => {
    return {
        createSchedule: (data) => dispatch(createScheduleRequest(data)),
        updateSchedule: (data) => dispatch(updateScheduleRequest(data)),
        // setMail: (e) => dispatch(setMail(e)),
        // setBus: (e) => dispatch(setBus(e)),
        // setStation: (e) => dispatch(setStation(e)),
        // setTrigger: (e) => dispatch(setTrigger(e)),
        // setTimes: (e) => dispatch(setTimes(e)),
        // setHour: (e) => dispatch(setHour(e)),
        // setMinute: (e) => dispatch(setMinute(e)),
        // setChecked: (e) => dispatch(setChecked(e)),
    };
}

const ConnectedDataDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataDialog);

export default ConnectedDataDialog;