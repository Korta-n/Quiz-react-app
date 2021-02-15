import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
class Auth extends Component {
    state = {
        isFormValid: false,
        formcontrols: {
            email: {
                value: '',
                type: 'email',
                placeholder: 'Enter email',
                label: 'Email',
                errorMessage: 'Email is incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                },
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter password',
                errorMessage: 'Password must be longer than 6 symbols',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
    }
    isValidate(val, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = val.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(val) && isValid
        }
        if (validation.NonNumeric) {
            isValid = val.search(/[0-9]/g) === -1 && isValid
        }

        if (validation.minLength) {
            isValid = val.length >= validation.minLength && isValid
        }
        return isValid
    }
    onInputChange = (event, ob) => {
        const formcontrols = { ...this.state.formcontrols }
        const control = { ...formcontrols[ob] }
        control.value = event.target.value
        control.touched = true
        control.valid = this.isValidate(control.value, control.validation)
        formcontrols[ob] = control

        let isFormValid = true

        Object.keys(formcontrols).forEach((key) => {
            isFormValid = formcontrols[key].valid && isFormValid
        })

        this.setState({ formcontrols, isFormValid })
    }
    renderInputs = () => {
        return Object.keys(this.state.formcontrols).map((e, i) => {
            const form = this.state.formcontrols[e]
            return (
                <Input
                    key={e + 1}
                    type={form.type}
                    placeholder={form.placeholder}
                    label={form.label}
                    errorMessage={form.errorMessage}
                    valid={form.valid}
                    touched={form.touched}
                    value={form.value}
                    shouldValidate={!!form.validation}
                    onChange={(evnt) => this.onInputChange(evnt, e)}
                />
            )
        })
    }
    loginHandler = async () => {
        await this.props.auth(
            this.state.formcontrols.email.value,
            this.state.formcontrols.password.value,
            true
        )
        const FormControls = this.state.formcontrols
        FormControls.password.value = ''
        this.setState({ FormControls })
    }
    registerHandler = () => {
        this.props.auth(
            this.state.formcontrols.email.value,
            this.state.formcontrols.password.value,
            false
        )
    }
    render() {
        const ErrorBoundary =
            this.props.AuthError === null
                ? null
                : this.props.AuthError.response.data.error.message
                      .split('_')
                      .join(' ')
                      .toLowerCase()
        const AuthError = ErrorBoundary
            ? ErrorBoundary[0].toUpperCase() +
              ErrorBoundary.slice(1, ErrorBoundary.length)
            : ErrorBoundary
        const ErrorRender = AuthError ? (
            <ul>
                <li>{AuthError}</li>
            </ul>
        ) : null
        return (
            <div className={classes.Auth}>
                <div className={classes.AuthForm}>
                    <h1>Log in &#129309;</h1>
                    <form
                        className={classes.Form}
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <div> {this.renderInputs()}</div>
                        <div className={classes.ErrorHandler}>
                            {ErrorRender}
                        </div>
                        <div className={classes.ButtonDiv}>
                            <Button
                                text={'Log in'}
                                onClick={this.loginHandler}
                                cls={'black BN BNR Auth_Buttons'}
                                styles={{
                                    width: 120,
                                    height: 45,
                                    borderRadius: '5px',
                                    marginRight: 10,
                                    border: '2px solid #000',
                                    color: '#000',
                                    fontSize: 26,
                                    fontWeight: 500,
                                }}
                                disabled={!this.state.isFormValid}
                            />
                            <div>
                                <Button
                                    text={'Sign up'}
                                    onClick={this.registerHandler}
                                    cls={'black BN BNR Auth_Buttons'}
                                    styles={{
                                        width: 120,
                                        height: 45,
                                        borderRadius: '5px',
                                        marginRight: 10,
                                        border: '2px solid #000',
                                        color: '#000',
                                        fontSize: 26,
                                        fontWeight: 500,
                                    }}
                                    disabled={!this.state.isFormValid}
                                />
                                <p className={classes.Guidance}>
                                    &#9757;Sign Up with
                                    <br /> current inputs
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        AuthError: state.auth.AuthError,
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isLogin) =>
            dispatch(auth(email, password, isLogin)),
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(Auth)
