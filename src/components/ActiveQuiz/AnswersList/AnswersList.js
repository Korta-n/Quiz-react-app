import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'
const AnswersList = (props) => {
    return (
        <ul className={classes.AnswersList}>
            {props.Answers.map((e, i) => {
                return (
                    <AnswerItem
                        state={props.state ? props.state[e.id] : null}
                        answer={e}
                        key={i}
                        ClickHandler={props.ClickHandler}
                    />
                )
            })}
        </ul>
    )
}

export default AnswersList
