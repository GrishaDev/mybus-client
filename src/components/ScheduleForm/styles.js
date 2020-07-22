export default {
    form: {
        // padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    fields: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
        // '& div': {
        //     marginRight: 10,
        //     width: 175
        // }
    },
    advanced: {
        width: '90%',
        '&.MuiExpansionPanel-root:before': {
            display: 'none',
        },
    },
    fake: {
        width: 200,
    },
    tick: {
        marginTop: 20,
        width: '100%',
        marginLeft: '5%',
        // padding: 10
    }

}