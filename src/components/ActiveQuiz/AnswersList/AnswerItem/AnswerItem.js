import React from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = (props) => {
    const cls = [classes.AnswerItem]
    if (props.state) {
        cls.push(classes[props.state])
    }
    return (
        <React.Fragment>
            <li
                className={cls.join(' ')}
                onClick={(e) => props.ClickHandler(e, props.answer.id)}
                state={props.state}
            >
                <div className={classes.BeforeItem}>&#128073;</div>
                {props.answer.text}
            </li>
        </React.Fragment>
    )
}
export default AnswerItem
