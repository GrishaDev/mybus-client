import  React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './styles';
import Header from './Header';
import Content from './Content';
import Add from './AddSchedule';
// const useStyles = makeStyles(styles);

export default () => {
    // const classes = useStyles();
    return (
        <>
            <Header />
            <Content />
            <Add/>
        </>
    )
}
