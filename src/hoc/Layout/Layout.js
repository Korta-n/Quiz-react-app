import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'
class Layout extends Component {
    state = {
        menu: false,
    }
    CloseMenuHandler() {
        this.setState({ menu: false })
    }
    toggleMenuHandler = () => {
        this.setState({ menu: !this.state.menu })
    }
    CloseOnClick = () => {
        this.setState({ menu: false })
    }
    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.CloseMenuHandler.bind(this)}
                    CloseOnClick={this.CloseOnClick}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>{this.props.children}</main>
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
    }
}
export default connect(MapStateToProps)(Layout)
