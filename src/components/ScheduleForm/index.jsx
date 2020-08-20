import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import DayPicker from './dayPicker';
import HourPicker from './hourPicker';
import getWebPushSub from 'workMaker';

const useStyles = makeStyles(styles);

//eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ({ form, setForm, setLoading }) => {
    const classes = useStyles();

    // const [advanced, setAdvanced] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState();

    //eslint-disable-next-line
    React.useEffect(() => {
        const date = createRuleAsDate(form.hour.value, form.minute.value);
        setSelectedDate(date);
    //eslint-disable-next-line
    },[form.hour])

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setForm({ ...form, 'hour': { touched: true, value: date?.getHours()},
                           'minute': { touched: true, value: date?.getMinutes()}});
    };

    const handleDaysChange = (daysofweek) => {
        setForm({ ...form, 'dayOfWeek': { touched: true, value: daysofweek} });
    }

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

                    <HourPicker selectedDate={selectedDate} handleDateChange={handleDateChange}/>

                    <div className={classes.fake}>
    
                    </div>

                    <DayPicker dayofweek={form.dayOfWeek.value} handleDaysChange={handleDaysChange}/>

                    <TextField required className={classes.fake} margin="normal" name="maxTrigger" label="Max time to station" value={form.maxTrigger.value}
                        type="number" helperText="How much minutes it takes to get to station from your starting location at most?"
                        onChange={changeHandler} error={!form.maxTrigger.value && form.maxTrigger.touched}/>

                    <TextField required className={classes.fake} margin="normal" name="minTrigger" label="Min time to station" value={form.minTrigger.value}
                        type="number" helperText="How much minutes it takes to get to station from your starting location if you are quick?"
                        onChange={changeHandler} error={!form.minTrigger.value && form.minTrigger.touched} />

                    
                    <TextField className={classes.fake} margin="normal" label="how many times?" name="times" value={form.times.value}
                        type="number" helperText="How many times to perform the notification? In case you might want the next bus." onChange={changeHandler} />

                    <div className={classes.fake}>

                    </div>

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

const createRuleAsDate = (hour = 8, minute = 0) => {
    let date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    return date;
}
// InputProps = {{ endAdornment: (
//     <InputAdornment position="end">
//         <Tooltip title={"haha"}>
//            <HelpIcon />
//        </Tooltip>
//    </InputAdornment>
// ), }}