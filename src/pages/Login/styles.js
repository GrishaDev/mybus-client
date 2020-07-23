export default {
        '@keyframes fly': {
        '0%': { transform: 'translateY(-400%)' },
        '100%': { transform: 'translateY(0%)' }
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    formBox: {
        // padding: 20,
        animation: '$fly 1s ease-out',
        height: 400,
        width: '50%',
        minWidth: 300,
        margin: '0 auto',
        position: 'relative'
        // verticalAlign: 'middle',
    },
    forceTitle: {
        marginTop: 15,
        width: '100%',
        position: 'absolute',
        top: 0,
        textAlign: 'center',
        fontSize: 'large',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: '0 auto',
    },
    form: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    mailField: {
        width: 150
    }
}