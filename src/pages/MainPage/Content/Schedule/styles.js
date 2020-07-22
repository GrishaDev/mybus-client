export default {
    '@keyframes something': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
    },
        '@keyframes fly': {
        '0%': { transform: 'translateX(-400%)' },
        '100%': { transform: 'translateX(0%)' }
    },
    card: {
        position: 'relative',
        // background: 'yellow',
        margin: '10px',
        height: '125px',
        width: '200px',
        padding: 10,
        // animation: '$fly 0.75s ease-out',
        // flex: '1',
        // transition: 'flex 250ms linear'
        // maxWidth: '40%',
    },
    collapse: {
        flex: '0'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        // marginTop: 5
    },
    info: {
        textAlign: 'center',
        marginTop: 30,
    },
    actions: {
        position: 'absolute',
        // marginTop: 30,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

// '@keyframes something': {
//     '0%': { transform: 'translateY(1000%)' },
//     '100%': { transform: 'translateY(0%)' }
//   },