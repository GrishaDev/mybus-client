
// svg {
//     display: inline-block;
//     position: absolute;
//     top: 0;
//     left: 0;
//   }
//   .container {
//     display: inline-block;
//     position: relative;
//     width: 100%;
//     padding-bottom: 100%;
//     vertical-align: middle;
//     overflow: hidden;
//   }

  
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
        color: 'white',
        // background: 'yellow',
        margin: '30px',
        height: '140px',
        width: '200px',
        // padding: 10,
        // animation: '$fly 0.75s ease-out',
        // flex: '1',
        // transition: 'flex 250ms linear'
        // maxWidth: '40%',
    },
    container: {
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        // paddingBottom: '100%',
        verticalAlign: 'middle',
        overflow: 'hidden',
        zIndex: 10,
     },
    bus: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    forceTitle: {
        marginTop: 5,
        width: '100%',
        position: 'absolute',
        top: 0,
        textAlign: 'center',
        fontSize: 'large',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: '0 auto',
    },
    title: {
        // background: 'rgba(0,0,0,0.5)',
        // borderRadius: '100% 40% 20% 40%',
        // margin: '0 auto',
        // width: '100%',
        // textAlign: 'center',
        // fontSize: 'large',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // marginTop: 5
    },
    info: {
        // textAlign: 'center',
        // marginTop: 30,
        // verticalAlign: 'middle',
        margin: '0 auto',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-around',
        // alignItems: 'flex-start'
    },
    actions: {
        position: 'absolute',
        // marginTop: 30,
        height: 30,
        bottom: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

// '@keyframes something': {
//     '0%': { transform: 'translateY(1000%)' },
//     '100%': { transform: 'translateY(0%)' }
//   },