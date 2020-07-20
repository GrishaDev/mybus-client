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

//eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ScheduleForm = ({data, setMail, setBus, setStation, setTrigger, setTimes, setHour, setMinute, setChecked }) => {
    const classes = useStyles();

    const [touchedMail, setTouchedMail] = React.useState(false);
    const [touchedBus, setTouchedBus] = React.useState(false);
    const [touchedStation, setTouchedStation] = React.useState(false);
    const [touchedHour, setTouchedHour] = React.useState(false);
    const [touchedMinute, setTouchedMinute] = React.useState(false);
    const [advanced, setAdvanced] = React.useState(false);

    const handleMailChange = (e) => {
        setTouchedMail(true);
        let mail = e.target.value;
        setMail(mail);
    };

    const handleBusChange = (e) => {
        setTouchedBus(true);
        let bus = e.target.value;
        setBus(bus);
    };

    const handleStationChange = (e) => {
        setTouchedStation(true);
        let station = e.target.value;
        setStation(station);
    };

    const handleHourChange = (e) => {
        setTouchedHour(true);
        let hour = e.target.value;
        setHour(hour);
    };

    const handleMinuteChange = (e) => {
        setTouchedMinute(true);
        let minute = e.target.value;
        setMinute(minute);;
    };

    const validateMail = () => {
        let test = re.test(String(data?.mail).toLowerCase());
        return ((!data?.mail || !test) && touchedMail);
    }

    const validateBus = () => {;
        return (!data?.bus && touchedBus);
    }

    const validateStation = () => {
        return (!data?.station  && touchedStation);
    }

    let more = [];
    if(advanced) { 
        more = [<TextField key={1} className={classes.fake} margin="normal"  label="trigger time" value={data?.scheduleTrigger || ''} type="number" helperText="Waits for bus to be X minutes from ur station" onChange={setTrigger}/>,
                <TextField key={2} margin="normal" label="notificates" value={data?.times || ''} type="number" helperText="How much times to notificate?" onChange={setTimes}/>]
    }
    return (
        <>
            <div className={classes.form}>
                <div className={classes.fields}>
                    <TextField error={validateMail()} margin="normal" required label="Mail" value={data?.mail || ''} helperText="" onChange={handleMailChange}/>
                    <TextField error={validateBus()} margin="normal" type="number" required label="bus id" value={data?.bus || ''} helperText="" onChange={handleBusChange}/>
                    <TextField error={validateStation()} margin="normal" type="number" required label="station id" value={data?.station || ''} helperText="" onChange={handleStationChange}/>
                    {/* <div></div> */}
                    <div className={classes.fake}></div>
                    <TextField error={!data?.hour && touchedHour} margin="normal" label="Hour" required value={data?.hour || ''} type="number" helperText="" onChange={handleHourChange}/>
                    <TextField error={!data?.minute && touchedMinute} margin="normal" label="Minute" required value={data?.minute || ''} type="number" helperText="" onChange={handleMinuteChange}/>
                    
                    <div className={classes.tick}>
                        <Checkbox
                            checked={advanced}
                            onChange={()=> setAdvanced(!advanced)}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        advanced?
                    </div>
                    {more}
                              
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
      setMail: (e) => dispatch(setMail(e)),
      setBus: (e) => dispatch(setBus(e)),
      setStation: (e) => dispatch(setStation(e)),
      setTrigger: (e) => dispatch(setTrigger(e.target.value)),
      setTimes: (e) => dispatch(setTimes(e.target.value)),
      setHour: (e) => dispatch(setHour(e)),
      setMinute: (e) => dispatch(setMinute(e)),
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