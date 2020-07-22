import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import useTheme from 'components/ThemeProvider/UseTheme';
import IconButton from '@material-ui/core/IconButton';
import { NightsStay } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
const useStyles = makeStyles(styles);

export default () => {
    const classes = useStyles();
    const themeProvider = useTheme();

    const mail = useSelector(
        state => state.myschedules.mail
    );

    return (
        <div className={classes.header}>
            <IconButton className={classes.dark} aria-label="delete" onClick={() => themeProvider.themeSwitch()}>
              <NightsStay/>
            </IconButton>
            <Typography className={classes.hello}>{`Hello ${mail}`}</Typography>
        </div>
    )
}
