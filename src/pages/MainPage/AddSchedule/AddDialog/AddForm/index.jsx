import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(styles);

export default ({setData}) => {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState();
    const [mail, setMail] = React.useState();
    const [bus, setBus] = React.useState();
    const [station, setStation] = React.useState();
    const [magic, setMagic] = React.useState();
    const [spam, setSpam] = React.useState();
    // const [formData, setFormData] = React.useState();

    const handleMailChange = (mail) => {
        setMail(mail);
        setThings();
    };

    const handleBusChange = (bus) => {
        setBus(bus);
        setThings();
    };

    const handleStationChange = (station) => {
        setStation(station);
        setThings();
    };

    const handleMagicChange = (magic) => {
        setMagic(magic);
        setThings();
    };

    const handleSpamChange = (spam) => {
        setSpam(spam);
        setThings();
    };

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
        setThings();
    };

    const handleCheck = (event) => {
        setChecked(event.target.checked);
        setThings();
    };

    const setThings = () => {
        console.log(selectedDate);
        setData({mail, bus, station, magic, spam, rules: {hour: selectedDate?.getHours(), minute: selectedDate?.getMinutes()}});
    }

    return (
        <>
            <div className={classes.form}>
                <TextField margin="normal" required label="Mail" defaultValue="ahah@gmail.com" helperText="" onChange={handleMailChange}/>
                <TextField margin="normal" required label="bus id" defaultValue="" helperText="" onChange={handleBusChange}/>
                <TextField margin="normal" required label="station id" defaultValue="" helperText="" onChange={handleStationChange}/>
                <TextField margin="normal"  label="magic number" defaultValue="" helperText="" onChange={handleMagicChange}/>
                <TextField margin="normal" label="spam times" defaultValue="" helperText="" onChange={handleSpamChange}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                    }}
                    />
                </MuiPickersUtilsProvider>
                
            </div>
            <div> use chrome notifications instead of mail?
                <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        </>
    )
}
