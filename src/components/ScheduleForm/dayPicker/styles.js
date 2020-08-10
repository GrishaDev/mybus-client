export default {
    week: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
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
        '& hover': {
            background: 'gray'
        }
    }
}