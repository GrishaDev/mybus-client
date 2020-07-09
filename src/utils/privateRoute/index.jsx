import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    // console.log({...rest});
    // let token = rest.token;
    return (
        <Route {...rest} render={(props) => (
            rest.token
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )} />
    )
}

const mapStateToProps = state => ({
    token: state.token
});
  
const connectedPrivateRoute = connect(
    mapStateToProps,
)(PrivateRoute);

export default connectedPrivateRoute;