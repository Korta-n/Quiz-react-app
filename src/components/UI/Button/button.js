import React from 'react'
import classes from './button.module.css'
import Radium from 'radium'
// import { NavLink } from 'react-router-dom'
const Button = (props) => {
    const clses = props.disabled ? '' : props.cls ? props.cls : ''
    const cls = [
        classes.Button,
        props.content === 'Score' ? classes.Score_butt : null,
        ...clses.split(' ').map((e) => {
            return classes[e]
        }),
        props.disabled ? classes.disabled : null,
    ]
    const stls = {
        ...props.styles,
    }
    return (
        <button
            style={stls}
            onClick={props.onClick}
            className={cls.join(' ')}
            content={props.content}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}
export default Radium(Button)
