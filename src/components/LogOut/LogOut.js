import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../../store/actions/auth'
class LogOut extends Component {
    componentDidMount() {
        this.props.logOut()
    }
    render() {
        return <Redirect to="/" />
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
    }
}
export default connect(null, MapDispatchToProps)(LogOut)
