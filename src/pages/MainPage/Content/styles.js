export default {
    content: {
        // marginTop: '50px',
        // height: '75vh',
        maxHeight: '85vh',
        // background: 'red',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        // alignContent: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'auto',
        overflowX: 'hidden'
        // tranisitionDuration: '3s',
        // flexGrow: 1
    },
    contentGrid: {
        listStyleType: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
        gridAutoRows: '8rem',
        gridGap: '1rem',
        padding: 0,
        margin: 0,
    },
    noSchedules: {
        fontSize: '2em',
        fontWeight: 'bold'
    }
}