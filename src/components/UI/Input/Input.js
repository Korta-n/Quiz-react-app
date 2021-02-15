import React from 'react'
import classes from './Input.module.css'
const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && touched && shouldValidate
}
const Input = (props) => {
    const LabelPreview = props.option
        ? props.option.includes('option')
            ? props.value
                ? props.value
                : ''
            : ''
        : ''
    const InputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${InputType}-${Math.random()}`

    if (props.BorderInval) {
        cls.push(classes.invalidB)
    } else {
        if (isInvalid(props)) {
            cls.push(classes.invalid)
        }
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>
                {props.label}
                {' ' + LabelPreview}
            </label>
            <input
                id={htmlFor}
                type={InputType}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                autoComplete="on"
                style={props.styles}
                // key={props.index + 1.223}
            />
            {/* {props.show ? <Icon i={'eye'} /> : <Icon i={'eye-slash'} />} */}
            {isInvalid(props) ? <span>{props.errorMessage}</span> : null}
        </div>
    )
}
export default Input
