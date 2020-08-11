export default {
    picker: {
        width: '100%',
        padding: 20,
    },
    title: {
        textAlign: 'center',
    },
    week: {
        // width: '70%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '0 auto',
    },
    day: {
        borderRadius: '100%',
        // background: 'green',
        margin: 5,
        padding: 5,
        width: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        transition: '0.5s',
        '&:hover': {
            background: 'gray',
            cursor: 'pointer'
        }
    }
}