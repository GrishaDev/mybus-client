import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import getWebPushSub from 'workMaker';

const useStyles = makeStyles(styles);

//eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ({ form, setForm }) => {
    const classes = useStyles();

    const [advanced, setAdvanced] = React.useState(false);

    const handleTick = async (e) => {
        const isWebPush = e.target.checked;
        if(isWebPush) {
            const sub = await getWebPushSub();
            console.log(sub);
            setForm({ ...form, checked: { touched: true, value: sub } })
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
        more = [<TextField key={1} className={classes.fake} margin="normal" name="trigger" label="trigger time" value={form.trigger.value} type="number" helperText="Waits for bus to be X minutes from ur station" onChange={changeHandler} />,
        <TextField key={2}  className={classes.fake} margin="normal" label="notificates" name="times" value={form.trigger.times} type="number" helperText="How much times to notificate?" onChange={changeHandler} />]
    }

    const icon = advanced ? <ExpandLessIcon /> : <ExpandMoreIcon />; 
    return (
            <div className={classes.form}>
                <div className={classes.fields}>
                    <TextField error={validateMail()} margin="normal" name="mail" required label="Mail" value={form.mail.value} helperText="" onChange={changeHandler} />
                    <TextField error={validateName()} margin="normal" autoComplete='off' name="name" required label="name" value={form.name.value} helperText="" onChange={changeHandler} />
                    <TextField error={validateBus()} margin="normal" type="number" name="bus" required label="bus line" value={form.bus.value} helperText="" onChange={changeHandler} />
                    <TextField error={validateStation()} margin="normal" type="number" name="station" required label="station id" value={form.station.value} helperText="" onChange={changeHandler} />
                    {/* <div></div> */}
                    {/* <div className={classes.fake}></div> */}

                    <TextField error={!form.hour.value && form.hour.touched} margin="normal" name="hour" label="Hour" required 
                    value={form.hour.value} type="number" helperText="" onChange={changeHandler} />

                    <TextField error={!form.minute.value && form.minute.touched} margin="normal" name="minute" label="Minute" required
                     value={form.minute.value} type="number" helperText="" onChange={changeHandler}/>

                    <div className={classes.tick} >
                        <IconButton onClick={()=> setAdvanced(!advanced)} >
                            {icon}
                        </IconButton>
                        Advanced fields
                    </div>

                    {more}

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


// const mapStateToProps = state => ({
//     data: state.form
//   });

//   const mapDispatchToProps = dispatch => {
//     return {
//       setMail: (e) => dispatch(setMail(e)),
//       setBus: (e) => dispatch(setBus(e)),
//       setStation: (e) => dispatch(setStation(e)),
//       setTrigger: (e) => dispatch(setTrigger(e.target.value)),
//       setTimes: (e) => dispatch(setTimes(e.target.value)),
//       setHour: (e) => dispatch(setHour(e)),
//       setMinute: (e) => dispatch(setMinute(e)),
//       setChecked: (e) => dispatch(setChecked(e.target.checked)),
//     };
//   }

// const connectedScheduleForm = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ScheduleForm);

// export default connectedScheduleForm;


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