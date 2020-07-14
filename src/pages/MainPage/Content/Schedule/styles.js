export default {
    '@keyframes something': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
    card: {
        position: 'relative',
        // background: 'yellow',
        margin: '10px',
        height: '100px',
        width: '200px',
        padding: 20,
        animation: '$something 0.5s',
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
        marginTop: 5
    },
    info: {
        textAlign: 'center',
    },
    actions: {
        // position: 'absolute',
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