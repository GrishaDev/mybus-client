import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
// import HelpIcon from '@material-ui/icons/Help';
import getWebPushSub from 'workMaker';

const useStyles = makeStyles(styles);

//eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ({ form, setForm, setLoading }) => {
    const classes = useStyles();

    const [advanced, setAdvanced] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const [value, setValue] = React.useState([10, 12]);

    const handleChangeTrigger = (event, newValue) => {
        setValue(newValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTick = async (e) => {
        const isWebPush = e.target.checked;
        if(isWebPush) {
            setLoading(true);
            const sub = await getWebPushSub();
            setForm({ ...form, checked: { touched: true, value: sub || false } })
            setLoading(false);
        }
        else {
            setForm({ ...form, checked: { touched: true, value: false } })
        }
    }

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: { touched: true, value: e.target.value } });
    }

    const validateMail = () => {
        let test = re.test(String(form.mail.value).toLowerCase());
        return ((!form.mail.value || !test) && form.mail.touched);
    }

    const validateName = () => {
        return (!form.name.value && form.name.touched);
    }

    const validateBus = () => {
        return (!form.bus.value && form.bus.touched);
    }

    const validateStation = () => {
        return (!form.station.value && form.station.touched);
    }

    let more = [];
    if (advanced) {
        more = [<TextField key={1} className={classes.fake} margin="normal" name="scheduleTrigger" label="trigger time" value={form.scheduleTrigger.value}
         type="number" helperText="Waits for bus to be X minutes from ur station and only then notificates
         example: if value 12 is given, the service will wait for bus to be 12minutes or less from station and only then notificate" onChange={changeHandler} />,

        <TextField key={2}  className={classes.fake} margin="normal" label="how many times?" name="times" value={form.times.value}
         type="number" helperText="How many times to perform the notification? In case you might want the next bus. default value: 1" onChange={changeHandler} />]
    }

    const icon = advanced ? <ExpandLessIcon /> : <ExpandMoreIcon />; 
    return (
            <div className={classes.form}>
                <div className={classes.fields}>
                    <TextField error={validateMail()} className={classes.fake} margin="normal" name="mail" required label="Mail"
                     value={form.mail.value} helperText="" onChange={changeHandler} />

                    <TextField error={validateName()} className={classes.fake} margin="normal" autoComplete='off' name="name" required label="name"
                     value={form.name.value} helperText="" onChange={changeHandler} />

                    <TextField error={validateBus()} className={classes.fake} margin="normal" type="number" name="bus" required label="bus number"
                     value={form.bus.value} helperText="Example: 171" onChange={changeHandler} />

                    <TextField error={validateStation()} className={classes.fake} margin="normal" type="number" name="station" required label="station id"
                     value={form.station.value} helperText="station number, find it on google maps" onChange={changeHandler} />

                    {/* <TextField error={!form.hour.value && form.hour.touched} className={classes.fake} margin="normal" name="hour" label="Hour" required 
                    value={form.hour.value} type="number" helperText="Good: 9,  bad: 9:00" onChange={changeHandler} />

                    <TextField error={!form.minute.value && form.minute.touched} className={classes.fake} margin="normal" name="minute" label="Minute" required
                     value={form.minute.value} type="number" helperText="Good: 30 or 5" onChange={changeHandler}/> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            className={classes.fake}
                            ampm={false}
                            margin="normal"
                            id="time-picker"
                            label="Depart time"
                            helperText="Time you would like to be on bus."
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                    {/* <div className={classes.slider}>
                        <Typography id="range-slider" gutterBottom>
                            Minimum and maximum time it takes for you to get to your station
                        </Typography>
                        <Slider
                            value={value}
                            onChange={handleChangeTrigger}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            max={20}
                            min={1}
                        />
                    </div> */}

                    <TextField className={classes.fake} margin="normal" name="scheduleTrigger" label="Max time to station" value={form.scheduleTrigger.value}
                        type="number" helperText="How much minutes it takes to get to station from your starting location at most?" onChange={changeHandler} />

                    <TextField className={classes.fake} margin="normal" name="scheduleTrigger" label="Min time to station" value={form.scheduleTrigger.value}
                        type="number" helperText="How much minutes it takes to get to station from your starting location if you are quick?" onChange={changeHandler} />


                    {/* <div className={classes.tick} >
                        <IconButton onClick={()=> setAdvanced(!advanced)} >
                            {icon}
                        </IconButton>
                        Advanced fields
                    </div>

                    {more} */}

                </div>
                <div className={classes.tick}>
                    <Checkbox
                        checked={form.checked.value ? true : false}
                        onChange={handleTick}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    use chrome notifications instead of mail?
                </div>
            </div>
    )
}

// InputProps = {{ endAdornment: (
//     <InputAdornment position="end">
//         <Tooltip title={"haha"}>
//            <HelpIcon />
//        </Tooltip>
//    </InputAdornment>
// ), }}