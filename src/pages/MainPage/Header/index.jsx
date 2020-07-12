import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

import IconButton from '@material-ui/core/IconButton';
import { NightsStay } from '@material-ui/icons';

const useStyles = makeStyles(styles);

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <IconButton aria-label="delete" onClick={() => null}>
              <NightsStay/>
            </IconButton>
        </div>
    )
}
