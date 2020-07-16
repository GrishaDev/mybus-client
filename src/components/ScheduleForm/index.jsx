import React, {useEffect} from 'react';
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

let mail;
let bus;
let station;
let magic;
let spam;
let date;
let checked;
let hour;
let minute;

export default ({data, setData}) => {
    const classes = useStyles();

    useEffect(()=> {
        console.log('form date updated');
        console.log(data);
        mail = data?.mail;
        bus = data?.bus;
        station = data?.station;
        magic = data?.magic;
        spam = data?.spam;
        date = data?.date;
        checked = data?.checked;
        hour = data?.rule?.hour;
        minute = data?.rule?.minute;
        setChecked(checked || false);
    },[data])

    const [checkedState, setChecked] = React.useState(false);
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

    const handleMailChange = (e) => {
        setTouchedMail(true);
        // setMail(mail);
        mail = e.target.value;
        setThings();
    };

    const handleBusChange = (e) => {
        setTouchedBus(true);
        // setBus(bus);
        bus = e.target.value;
        setThings();
    };

    const handleStationChange = (e) => {
        setTouchedStation(true);
        // setStation(station);
        station = e.target.value;
        setThings();
    };

    const handleMagicChange = (e) => {
        // setMagic(magic);
        magic = e.target.value;
        setThings();
    };

    const handleSpamChange = (e) => {
        // setSpam(spam);
        spam = e.target.value;
        setThings();
    };

    const handleHourChange = (e) => {
        // setSpam(spam);
        setTouchedHour(true);
        hour = e.target.value;
        setThings();
    };

    const handleMinuteChange = (e) => {
        // setSpam(spam);
        setTouchedMinute(true);
        minute = e.target.value;
        setThings();
    };

    const handleDateChange = (e) => {
        const cooldate = new Date(e);
        date = new Date(e);
        setThings();
    };

    const handleCheck = (event) => {
        // setChecked(event.target.checked);
        checked = event.target.checked;
        setChecked(checked);
        setThings();
    };

    const setThings = () => {
        // setData({mail, bus, station, magic, spam, rule: {hour: date?.getHours(), minute: date?.getMinutes()}, checked});
        setData({mail, bus, station, magic, spam, rule: {hour, minute}, checked});

    }

    const validateMail = () => {
        let test = re.test(String(mail).toLowerCase());
        return ((!mail || !test) && touchedMail);
    }

    const validateBus = () => {
        // let test = isNaN(bus);
        return (!bus && touchedBus);
    }

    const validateStation = () => {
        // let test = isNaN(station);
        return (!station  && touchedStation);
    }

    return (
        <>
            <div className={classes.form}>
                <div className={classes.fields}>
                    <TextField error={validateMail()} margin="normal" required label="Mail" value={data?.mail || ''} helperText="" onChange={handleMailChange}/>
                    <TextField error={validateBus()} margin="normal" type="number" required label="bus id" value={data?.bus || ''} helperText="" onChange={handleBusChange}/>
                    <TextField error={validateStation()} margin="normal" type="number" required label="station id" value={data?.station || ''} helperText="" onChange={handleStationChange}/>
                    {/* <Divider variant="middle"/> */}
                    <TextField margin="normal"  label="trigger time" value={data?.magic || ''} type="number" helperText="Turns into advanced mode, waits for bus to be X minutes from ur station" onChange={handleMagicChange}/>
                    <TextField margin="normal" label="notificates" value={data?.spam || ''} type="number" helperText="How much times to notificate?" onChange={handleSpamChange}/>
                    
                    <div></div>
                    <TextField error={!hour && touchedHour} margin="normal" label="Hour" required value={data?.rule?.hour || ''} type="number" helperText="" onChange={handleHourChange}/>
                    <TextField error={!minute && touchedMinute} margin="normal" label="Minute" required value={data?.rule?.minute || ''} type="number" helperText="" onChange={handleMinuteChange}/>
                </div>
                <div className={classes.tick}> 
                    <Checkbox
                        checked={checkedState}
                        onChange={handleCheck}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    use chrome notifications instead of mail?
                </div>
            </div>
        </>
    )
}

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