import React from 'react'
import classes from './Select.module.css'

const Select = (props) => {
    const HtmlFor = `${props.label}-${Math.random()}`
    return (
        <div className={classes.Select}>
            <label htmlFor={HtmlFor} style={{ width: '90%', fontSize: 14 }}>
                {props.label}
            </label>
            <select id={HtmlFor} value={props.value} onChange={props.onChange}>
                {props.options.map((e, i) => {
                    return (
                        <option value={e.value} key={e.value + i}>
                            {e.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
export default Select
