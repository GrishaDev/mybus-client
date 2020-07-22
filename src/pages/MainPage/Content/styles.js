export default {
    content: {
        // marginTop: '50px',
        // height: '75vh',
        maxHeight: '75vh',
        // background: 'red',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        // alignContent: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'auto',
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
    }
}