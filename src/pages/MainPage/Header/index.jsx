import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import useTheme from 'components/ThemeProvider/UseTheme';
import IconButton from '@material-ui/core/IconButton';
import { NightsStay } from '@material-ui/icons';

const useStyles = makeStyles(styles);

export default () => {
    const classes = useStyles();
    const themeProvider = useTheme();

    return (
        <div className={classes.header}>
            <IconButton aria-label="delete" onClick={() => themeProvider.themeSwitch()}>
              <NightsStay/>
            </IconButton>
        </div>
    )
}
