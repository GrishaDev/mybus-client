import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute,
setChecked } from 'stateStuff/reducers/formReducer';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(styles);

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// let mail;
// let bus;
// let station;
// let magic;
// let spam;
// let date;
// let checked;
// let hour;
// let minute;

const ScheduleForm = ({data, setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute, setChecked }) => {
    const classes = useStyles();

    // useEffect(()=> {
    //     console.log('form date updated');
    //     console.log(data);
    //     mail = data?.mail;
    //     bus = data?.bus;
    //     station = data?.station;
    //     magic = data?.magic;
    //     spam = data?.spam;
    //     date = data?.date;
    //     checked = data?.checked;
    //     hour = data?.rule?.hour;
    //     minute = data?.rule?.minute;
    //     setChecked(checked || false);
    // },[data])

    // const [checkedState, setChecked] = React.useState(false);
    // const [selectedDate, setSelectedDate] = React.useState();
    // const [mail, setMail] = React.useState();
    // const [bus, setBus] = React.useState();
    // const [station, setStation] = React.useState();
    // const [magic, setMagic] = React.useState();
    // const [spam, setSpam] = React.useState();
    const [touchedMail, setTouchedMail] = React.useState(false);
    const [touchedBus, setTouchedBus] = React.useState(false);
    const [touchedStation, setTouchedStation] = React.useState(false);
    const [touchedHour, setTouchedHour] = React.useState(false);
    const [touchedMinute, setTouchedMinute] = React.useState(false);

    
    // const [formData, setFormData] = React.useState();

    // const handleMailChange = (e) => {
    //     setTouchedMail(true);
    //     // setMail(mail);
    //     mail = e.target.value;
    //     setThings();
    // };

    // const handleBusChange = (e) => {
    //     setTouchedBus(true);
    //     // setBus(bus);
    //     bus = e.target.value;
    //     setThings();
    // };

    // const handleStationChange = (e) => {
    //     setTouchedStation(true);
    //     // setStation(station);
    //     station = e.target.value;
    //     setThings();
    // };

    // const handleMagicChange = (e) => {
    //     // setMagic(magic);
    //     magic = e.target.value;
    //     setThings();
    // };

    // const handleSpamChange = (e) => {
    //     // setSpam(spam);
    //     spam = e.target.value;
    //     setThings();
    // };

    // const handleHourChange = (e) => {
    //     // setSpam(spam);
    //     setTouchedHour(true);
    //     hour = e.target.value;
    //     setThings();
    // };

    // const handleMinuteChange = (e) => {
    //     // setSpam(spam);
    //     setTouchedMinute(true);
    //     minute = e.target.value;
    //     setThings();
    // };

    // const handleDateChange = (e) => {
    //     const cooldate = new Date(e);
    //     date = new Date(e);
    //     setThings();
    // };

    // const handleCheck = (event) => {
    //     // setChecked(event.target.checked);
    //     checked = event.target.checked;
    //     setChecked(checked);
    //     setThings();
    // };

    // const setThings = () => {
    //     // setData({mail, bus, station, magic, spam, rule: {hour: date?.getHours(), minute: date?.getMinutes()}, checked});
    //     setData({mail, bus, station, magic, spam, rule: {hour, minute}, checked});

    // }

    const validateMail = () => {
        let test = re.test(String(data?.mail).toLowerCase());
        return ((!data?.mail || !data?.test) && touchedMail);
    }

    const validateBus = () => {
        // let test = isNaN(bus);
        return (!data?.bus && touchedBus);
    }

    const validateStation = () => {
        // let test = isNaN(station);
        return (!data?.station  && touchedStation);
    }

    return (
        <>
            <div className={classes.form}>
                <div className={classes.fields}>
                    <TextField error={validateMail()} margin="normal" required label="Mail" value={data?.mail || ''} helperText="" onChange={setMail}/>
                    <TextField error={validateBus()} margin="normal" type="number" required label="bus id" value={data?.bus || ''} helperText="" onChange={setBus}/>
                    <TextField error={validateStation()} margin="normal" type="number" required label="station id" value={data?.station || ''} helperText="" onChange={setStation}/>
                    {/* <Divider variant="middle"/> */}
                    <TextField margin="normal"  label="trigger time" value={data?.magic || ''} type="number" helperText="Turns into advanced mode, waits for bus to be X minutes from ur station" onChange={setTrigger}/>
                    <TextField margin="normal" label="notificates" value={data?.spam || ''} type="number" helperText="How much times to notificate?" onChange={setTimes}/>
                    
                    <div></div>
                    <TextField error={!data?.hour && touchedHour} margin="normal" label="Hour" required value={data?.rule?.hour || ''} type="number" helperText="" onChange={setHour}/>
                    <TextField error={!data?.minute && touchedMinute} margin="normal" label="Minute" required value={data?.rule?.minute || ''} type="number" helperText="" onChange={setMinute}/>
                </div>
                <div className={classes.tick}> 
                    <Checkbox
                        checked={data?.checked || false}
                        onChange={setChecked}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    use chrome notifications instead of mail?
                </div>
            </div>
        </>
    )
}


const mapStateToProps = state => ({
    data: state.form
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      setMail: (e) => dispatch(setMail(e.target.value)),
      setBus: (e) => dispatch(setBus(e.target.value)),
      setStation: (e) => dispatch(setStation(e.target.value)),
      setTrigger: (e) => dispatch(setTrigger(e.target.value)),
      setTimes: (e) => dispatch(setTimes(e.target.value)),
      setHour: (e) => dispatch(setHour(e.target.value)),
      setMinute: (e) => dispatch(setMinute(e.target.value)),
      setChecked: (e) => dispatch(setChecked(e.target.checked)),
    };
  }

const connectedScheduleForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleForm);

export default connectedScheduleForm;


/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            id="time-picker"
                            label="Notify time"
                            margin="normal"
                            value={date}
                            required
                            // error={isNaN(date?.getTime())}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                        }}
                        />
                    </MuiPickersUtilsProvider> */