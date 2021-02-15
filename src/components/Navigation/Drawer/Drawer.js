import React, { Component } from 'react'
import classes from './Drawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import { NavLink } from 'react-router-dom'
import logo from './guest.png'
import { connect } from 'react-redux'
class Drawer extends Component {
    renderLinks(links) {
        return links.map((elem, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={{
                            pathname: elem.to,
                        }}
                        exact={elem.exact}
                        activeClassName={classes.ActiveLink}
                        onClick={this.props.CloseOnClick}
                    >
                        {elem.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const Email = this.props.CurrentUserEmail
            ? this.props.CurrentUserEmail.length > 23
                ? this.props.CurrentUserEmail.slice(0, 20) + '...'
                : this.props.CurrentUserEmail
            : 'Guest'
        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        const links = [{ to: '/', label: 'Home page', exact: true }]
        if (this.props.isAuthenticated) {
            links.push({
                to: '/create-quiz',
                label: 'Create quiz',
                exact: false,
            })
            links.push({ to: '/logout', label: 'Log out', exact: false })
        } else {
            links.push({ to: '/auth', label: 'Log in ', exact: false })
        }
        return (
            <React.Fragment>
                {this.props.isOpen ? (
                    <BackDrop onClick={this.props.onClose} />
                ) : null}

                <nav className={cls.join(' ')}>
                    <div className={classes.UserBlock}>
                        <div className={classes.ProfileCircle}>
                            <img
                                style={{ transform: 'translateY(10px)' }}
                                src={logo}
                                alt="Guest"
                                width="100%"
                                height="100%"
                            ></img>
                        </div>
                        <p className={classes.EmailParagraph}>{Email}</p>
                    </div>
                    <ul>{this.renderLinks(links)}</ul>
                </nav>
            </React.Fragment>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        token: state.auth.token,
        CurrentUserEmail: state.auth.CurrentUserEmail,
    }
}
export default connect(MapStateToProps)(Drawer)
